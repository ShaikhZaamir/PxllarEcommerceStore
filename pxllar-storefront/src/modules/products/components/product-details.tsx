"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Share2, Star, Truck, RotateCcw, Shield } from "lucide-react"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { Card, CardContent } from "components/ui/card"
import { Separator } from "components/ui/separator"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { useCart } from "lib/context/cart-context"
import { useToast } from "lib/hooks/use-toast"
import { formatPrice } from "lib/utils"

interface ProductDetailsProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    images: string[]
    seller: {
      name: string
      rating: number
      totalProducts: number
    }
    rating: number
    reviews: number
    category: string
    tags: string[]
    variants: Array<{
      name: string
      options: string[]
    }>
    specifications: Array<{
      name: string
      value: string
    }>
    inStock: boolean
    stockQuantity: number
    shippingInfo: {
      freeShipping: boolean
      estimatedDelivery: string
      returnPolicy: string
    }
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const { addItem } = useCart()
  const { toast } = useToast()

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        seller: product.seller.name,
        quantity,
        variants: selectedVariants,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Thumbnails Row */}
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${selectedImage === index
                ? "border-black ring-2 ring-offset-1 ring-black"
                : "border-gray-200 hover:border-black"
                }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">by {product.seller.name}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <Badge variant="outline">{product.category}</Badge>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          {product.variants.map((variant) => (
            <div key={variant.name}>
              <label className="text-sm font-medium mb-2 block">{variant.name}</label>
              <Select
                value={selectedVariants[variant.name] || ""}
                onValueChange={(value) => setSelectedVariants((prev) => ({ ...prev, [variant.name]: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${variant.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div>
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: Math.min(10, product.stockQuantity) }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock || isLoading}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>

          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm">
            {product.inStock ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
          </span>
        </div>

        {/* Shipping Info */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium">
                  {product.shippingInfo.freeShipping ? "Free Shipping" : "Shipping Available"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery: {product.shippingInfo.estimatedDelivery}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <RotateCcw className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-sm text-muted-foreground">{product.shippingInfo.returnPolicy}</p>
              </div>
            </div>
            
            <Separator />

            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-purple-600" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-muted-foreground">100% secure payment with SSL encryption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">{spec.name}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
