"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "components/ui/badge"
import { Card, CardContent } from "components/ui/card"
import { formatPrice } from "lib/utils"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  seller: string
  rating: number
  reviews: number
  badge?: string
  handle?: string
  description?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col relative max-h-[300px]">
      <CardContent className="p-1 sm:p-2 flex flex-col flex-grow">
        {/* Image + Badge */}
        <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden rounded">
          <Link href={`/products/${product.handle}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {product.badge && (
            <Badge
              className="absolute top-0 left-0 bg-blue-100 text-red-800 font-semibold text-[10px] px-1 py-0.5 rounded-none rounded-br-md shadow-sm"
              variant="secondary"
            >
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-1 flex flex-col flex-grow">
          <Link href={`/products/${product.handle}`}>
            <h3 className="font-semibold text-sm sm:text-base text-black group-hover:text-gray-600 transition-colors cursor-pointer line-clamp-2 h-8 leading-4">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-gray-600 text-xs mb-1 line-clamp-1 h-5 leading-4">
              {product.description}
            </p>
          )}

          {/* Seller + Rating */}
          <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground">
            <span>
              by <span className="font-medium">{product.seller}</span>
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-red-400 text-red-400" />
              <span className="font-medium">{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
          </div>

          {/* Price + Discount */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-black">{formatPrice(product.price)}</span>

            {typeof product.originalPrice === "number" &&
              typeof product.price === "number" &&
              product.originalPrice > product.price && (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <Badge variant="secondary" className="bg-gray-200 text-black text-[10px]">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}




// "use client"

// import type React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Star } from "lucide-react"
// import { Badge } from "components/ui/badge"
// import { Card, CardContent } from "components/ui/card"
// import { formatPrice } from "lib/utils"

// interface Product {
//   id: string
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   seller: string
//   rating: number
//   reviews: number
//   badge?: string
//   handle?: string
// }

// interface ProductCardProps {
//   product: Product
// }


// export function ProductCard({ product }: ProductCardProps) {
//   const discountPercentage = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0

//   // console.log("Product handle for preview:", product.name, product.handle)

//   return (
//     <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col relative">
//       <CardContent className="p-0 flex flex-col h-full">
//         {/* Image + Badge */}
//         <div className="relative aspect-[3/4] overflow-hidden">
//           <Link href={`/products/${product.handle}`}>
//             <Image
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </Link>

//           {product.badge && (
//             <Badge
//               className="absolute top-0 left-0 bg-blue-100 text-red-800 font-semibold text-xs px-2.5 py-1.5 rounded-none rounded-br-md shadow-sm"
//               variant="secondary"
//             >
//               {product.badge}
//             </Badge>
//           )}
//         </div>

//         {/* Info Section */}
//         <div className="p-2 sm:p-4 flex flex-col flex-grow">
//           <Link href={`/products/${product.handle}`}>
//             <h3 className="font-semibold text-lg sm:text-lg text-black group-hover:text-gray-600 transition-colors cursor-pointer line-clamp-2 sm:h-14 h-12 leading-6 sm:leading-7">
//               {product.name}
//             </h3>
//           </Link>

//           {/* Description */}
//           <p className="text-gray-600 text-sm mb-2 line-clamp-1 h-10 leading-5">
//             {product.description}
//           </p>

//           {/* Seller + Rating */}
//           <div className="flex justify-between items-center mb-3 sm:mb-4 text-sm text-muted-foreground">
//             <span>
//               by <span className="font-medium">{product.seller}</span>
//             </span>
//             <div className="flex items-center gap-1">
//               <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
//               <span className="font-medium">{product.rating}</span>
//               <span>({product.reviews})</span>
//             </div>
//           </div>

//           {/* Price + Discount */}
//           <div className="flex items-center gap-2 mb-1 h-7">
//             <span className="text-xl sm:text-2xl font-bold text-black">{formatPrice(product.price)}</span>

//             {typeof product.originalPrice === "number" &&
//               typeof product.price === "number" &&
//               product.originalPrice > product.price && (
//                 <>
//                   <span className="text-lg text-gray-500 line-through">
//                     {formatPrice(product.originalPrice)}
//                   </span>

//                   <Badge variant="secondary" className="bg-gray-200 text-black text-[12px]">
//                     {Math.round(
//                       ((product.originalPrice - product.price) / product.originalPrice) * 100
//                     )}
//                     % OFF
//                   </Badge>
//                 </>
//               )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>

//   )
// }
