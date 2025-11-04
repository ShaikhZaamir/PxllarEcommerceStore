import { listNewArrivals } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductPreview } from "@modules/products/components/product-preview"
import { Button } from "components/ui/button"
import Link from "next/link"

export default async function NewArrivalsProducts() {
    const countryCode = "in"
    const region = await getRegion(countryCode)

    if (!region) return null

    // ✅ Fetch only products from the "new-arrivals" collection
    const products = await listNewArrivals(8)

    const tagPriority = ["trending", "lowest price", "bestseller", "new arrival"]

    const displayProducts = products.map((p) => {
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
            if (basePrice) {
                originalPrice = basePrice.amount
            }
        }

        const matchedTag = p.tags?.find((tag) =>
            tagPriority.includes(tag.value.toLowerCase())
        )

        const tagBadge = matchedTag
            ? matchedTag.value.charAt(0).toUpperCase() + matchedTag.value.slice(1)
            : undefined

        return {
            id: p.id,
            name: p.title,
            price: Number(calculated),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            image: p.thumbnail || p.images?.[0]?.url || "/placeholder.svg",
            seller: p.type?.value || "Pxllar",
            rating: p.metadata?.rating ? parseFloat(p.metadata.rating) : 4.5,
            reviews: p.metadata?.reviews ? parseInt(p.metadata.reviews) : 12,
            description: p.description || "No description available",
            tags: p.tags?.map((t) => t.value) || [],
            badge: tagBadge || undefined,
            handle: p.handle,
        }
    })

    return (
        <section>
            <div className="mx-auto md:py-5 pb-10 px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">
                            New Arrivals
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Discover the latest trends freshly added to our store
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        asChild
                        className="hidden md:inline-flex bg-transparent"
                    >
                        <Link href="/in/store?collection=new-arrivals">View All Products</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayProducts.map((product) => (
                        <ProductPreview key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-8 md:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/in/store?collection=new-arrivals">View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
