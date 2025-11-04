"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "components/ui/badge"
import { Card, CardContent } from "components/ui/card"
import { useCart } from "lib/context/cart-context"
import { useToast } from "lib/hooks/use-toast"
import { formatPrice } from "lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    seller: string
    rating: number
    reviews: number
    available?: boolean
    handle?: string
    badge?: string
    description?: string
    tags?: string[]
  }
}

export function ProductPreview({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        seller: product.seller,
        quantity: 1,
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
    <Link href={`/products/${product.handle}`} className="block">
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col relative cursor-pointer">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image + Badge */}
          <div className="relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-52 md:h-96 object-contain group-hover:scale-105 transition-transform duration-300"
            />

            {product.badge && (
              <Badge
                className="absolute top-0 left-0 bg-blue-100 text-blue-800 font-semibold 
                  text-xs sm:text-[11px] md:text-sm 
                  px-2.5 sm:px-2 py-1.5 sm:py-1 rounded-none rounded-br-md shadow-sm"
                variant="secondary"
              >
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Info Section */}
          <div className="p-2 sm:p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg sm:text-lg text-black group-hover:text-gray-600 transition-colors pb-2 leading-6 sm:leading-7 line-clamp-2">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-2 line-clamp-1 h-10 leading-5">
              {product.description || "No description available."}
            </p>

            {/* Store name + Rating */}
            <div className="flex justify-between items-center mb-2 sm:mb-4 text-sm text-muted-foreground">
              <span>
                by <span className="font-medium">{product.seller}</span>
              </span>

              {/* <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span>({product.reviews})</span>
              </div> */}
            
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb- h-7">
              <span className="text-xl sm:text-2xl font-bold text-black">
                {formatPrice(product.price)}
              </span>

              {typeof product.originalPrice === "number" &&
                typeof product.price === "number" &&
                product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>

                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 text-[12px]"
                    >
                      {Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )}
                      % OFF
                    </Badge>
                  </>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}



{/* Add to Cart Button */ }
{/* <div className="mt-auto">
  <Button
    type="button"
    className="w-full text-sm sm:text-base bg-black text-white hover:bg-black/90"
    onClick={handleAddToCart}
    disabled={!product.available || isLoading}
  >
    {isLoading ? (
      <Loader2 className="w-4 h-4 animate-spin mr-2" />
    ) : (
      "Add to Cart"
    )}
  </Button>
</div> */}