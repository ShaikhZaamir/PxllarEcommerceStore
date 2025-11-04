"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { ProductCardSkeleton } from "components/ui/product-card-skeleton"
import { ProductCard } from "@modules/product/product-card"
import { getRecommendedProducts } from "@lib/medusa-client"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number
  currency: string
  image: string
  images: string[]
  category: string
  seller: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockLevel: number
  variants: Array<{
    id: string
    name: string
    price: number
    sku?: string
    stockLevel: number
    options: any[]
  }>
  specifications: {
    brand: string
    material: string
    warranty: string
    weight: string
    dimensions: string
  }
  tags: string[]
  type: string
  createdAt: string
  updatedAt: string
}

interface RelatedProductsProps {
  productId: string
  className?: string
}

export function RelatedProducts({ productId, className }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const relatedProducts = await getRecommendedProducts(productId, 4)
        setProducts(relatedProducts)
      } catch (err) {
        console.error("Error fetching related products:", err)
        setError("Failed to load related products")
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchRelatedProducts()
    }
  }, [productId])

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
          <CardDescription>Products you might also like</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
          <CardDescription>Products you might also like</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (products.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
          <CardDescription>Products you might also like</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No related products found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Related Products</CardTitle>
        <CardDescription>Products you might also like based on this item</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              seller={product.seller}
              inStock={product.inStock}
              slug={product.slug}
              className="h-full"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
