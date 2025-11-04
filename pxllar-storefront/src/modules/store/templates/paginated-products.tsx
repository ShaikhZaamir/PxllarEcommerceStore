import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductPreview } from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 20

// 👇 fetch category id by handle
async function getCategoryIdFromHandle(handle: string): Promise<string | null> {
  const baseUrl = process.env.MEDUSA_BACKEND_URL
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!baseUrl || !key) {
    console.error("❌ Medusa base URL or publishable key not set")
    return null
  }

  try {
    const res = await fetch(`${baseUrl}/store/product-categories?handle=${handle}`, {
      headers: { "x-publishable-api-key": key },
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return data.product_categories?.[0]?.id || null
  } catch (e) {
    console.error("Failed to fetch category by handle:", e)
    return null
  }
}

// 👇 fetch collection id by handle
async function getCollectionIdFromHandle(handle: string): Promise<string | null> {
  const baseUrl = process.env.MEDUSA_BACKEND_URL
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!baseUrl || !key) {
    console.error("❌ Medusa base URL or publishable key not set")
    return null
  }

  try {
    const res = await fetch(`${baseUrl}/store/collections?handle=${handle}`, {
      headers: { "x-publishable-api-key": key },
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return data.collections?.[0]?.id || null
  } catch {
    return null
  }
}

// 👇 fetch product type id (brand) by value
async function getProductTypeIdFromValue(value: string): Promise<string | null> {
  const baseUrl = process.env.MEDUSA_BACKEND_URL
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!baseUrl || !key) {
    console.error("❌ Medusa base URL or publishable key not set")
    return null
  }

  try {
    const res = await fetch(`${baseUrl}/store/product-types?value=${encodeURIComponent(value)}`, {
      headers: { "x-publishable-api-key": key },
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return data.product_types?.[0]?.id || null
  } catch (e) {
    console.error("❌ Failed to fetch product type for brand:", e)
    return null
  }
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  type_id?: string[] 
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy = "trending",
  page,
  collectionId,
  categoryId,
  brand, 
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  brand?: string
  productsIds?: string[]
  countryCode: string
}) {
  
  const queryParams: PaginatedProductsParams = { limit: PRODUCT_LIMIT }

  // Collection filter
  if (collectionId) {
    const resolvedCollectionId = await getCollectionIdFromHandle(collectionId)
    if (resolvedCollectionId) queryParams.collection_id = [resolvedCollectionId]
  }

  // Category filter
  if (categoryId) {
    const resolvedCategoryId = await getCategoryIdFromHandle(categoryId)
    if (resolvedCategoryId) queryParams.category_id = [resolvedCategoryId]
  }

  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-3 md:gap-4 gap-y-4"
        data-testid="products-list"
      >
        {products.map((p) => {
          const variant = p.variants?.[0]
          const calculated = variant?.calculated_price?.calculated_amount ?? 0
          const original = variant?.calculated_price?.original_amount
          let originalPrice: number | undefined = undefined
          if (original && original > calculated) {
            originalPrice = original
          } else {
            const basePrice = variant?.prices?.find(
              (price) =>
                price.amount > calculated &&
                (!price.price_list_id || price.price_list_id === null)
            )
            if (basePrice) originalPrice = basePrice.amount
          }

          const tagPriority = ["trending", "lowest price", "bestseller", "new arrival"]
          const tagBadge = p.tags?.find((tag) => tagPriority.includes(tag.value.toLowerCase()))?.value

          const displayProduct = {
            id: p.id,
            name: p.title,
            handle: p.handle,
            price: Number(calculated),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            image: p.thumbnail || p.images?.[0]?.url || "/placeholder.svg",
            seller: p.type?.value || "Pxllar Store",
            rating: p.metadata?.rating ? parseFloat(p.metadata.rating) : 4.5,
            reviews: p.metadata?.reviews ? parseInt(p.metadata.reviews) : 12,
            description: p.description || "No description available",
            tags: p.tags?.map((t) => t.value) || [],
            badge: tagBadge || undefined,
          }

          return (
            <li key={p.id}>
              <ProductPreview product={displayProduct} />
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
