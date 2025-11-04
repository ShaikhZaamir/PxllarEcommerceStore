import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface MinPricedProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
}

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price / created_at / trending
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  let sortedProducts = products as MinPricedProduct[]

  // PRICE sorting (precompute min price)
  if (["price_asc", "price_desc"].includes(sortBy)) {
    // Precompute the minimum price for each product
    sortedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product._minPrice = Math.min(
          ...product.variants.map(
            (variant) => variant?.calculated_price?.calculated_amount || 0
          )
        )
      } else {
        product._minPrice = Infinity
      }
    })

    // Sort products based on the precomputed minimum prices
    sortedProducts.sort((a, b) => {
      const diff = a._minPrice! - b._minPrice!
      return sortBy === "price_asc" ? diff : -diff
    })

    return sortedProducts
  }

  // TRENDING sorting: prioritize products that have priority tags
  if (sortBy === "trending") {
    // tags that should make a product float to top (lowercase)
    const priorityTags = [
      "bestseller",
      "trending",
      "hot",
      "featured",
      "new arrival",
      "lowest price"
    ]

    const extractTagValues = (product: HttpTypes.StoreProduct) => {
      const tags = (product as any).tags || []
      return tags
        .map((t: any) => {
          if (typeof t === "string") return t.toLowerCase()
          if (t && typeof t.value === "string") return t.value.toLowerCase()
          // fallback
          return String(t || "").toLowerCase()
        })
        .filter(Boolean)
    }

    sortedProducts.sort((a, b) => {
      const aTags = extractTagValues(a)
      const bTags = extractTagValues(b)

      const aHas = aTags.some((t: string) => priorityTags.includes(t))
      const bHas = bTags.some((t: string) => priorityTags.includes(t))

      // products with a priority tag come first
      if (aHas && !bHas) return -1
      if (!aHas && bHas) return 1

      // both have (or both don't) → randomize instead of created_at
      return Math.random() - 0.5
    })

    return sortedProducts
  }

  // CREATED AT (newest first)
  if (sortBy === "created_at") {
    sortedProducts.sort((a, b) => {
      return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    })
    return sortedProducts
  }

  // default: return as-is
  return sortedProducts
}
