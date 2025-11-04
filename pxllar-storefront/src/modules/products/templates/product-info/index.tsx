"use client"

import { HttpTypes } from "@medusajs/types"
import React from "react"
import { Star } from "lucide-react"
import { Badge } from "components/ui/badge"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const storeName = product?.type?.value || "Pxllar Store"

  // Extract rating and reviews safely
  const rating = Number(product?.metadata?.rating) || 4.5
  const reviews = Number(product?.metadata?.reviews) || 32
  const category = product?.collection?.title || "General"

  return (
    <div id="product-info" className="space-y-2">
      {/* Product Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

      {/* Seller Name */}
      <p className="text-muted-foreground mb-4">
        by {storeName}
      </p>


      {/* Ratings + Category Badge */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviews} reviews)</span>
        </div>
        <Badge variant="outline">{category}</Badge>
      </div>
    </div>
  )
}

export default ProductInfo
