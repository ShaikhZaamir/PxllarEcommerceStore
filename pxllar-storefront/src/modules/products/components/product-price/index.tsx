import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const highestPrice = Math.max(
    ...(
      product?.variants?.flatMap(v =>
        v.prices?.map(price => price.amount) ?? []
      ) ?? [0]
    )
  )

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  // Calculate percentage discount from highestPrice
  const discountPercentage =
    highestPrice && highestPrice > selectedPrice.calculated_price_number
      ? Math.round(
          ((highestPrice - selectedPrice.calculated_price_number) / highestPrice) * 100
        )
      : null

  return (
    <div className="flex items-center gap-2">
      {/* Current Price (variant or cheapest) */}
      <span className="text-2xl font-semibold text-gray-900">
        {selectedPrice.calculated_price}
      </span>

      {/* Strikethrough Price (Highest Price) */}
      {highestPrice && highestPrice > selectedPrice.calculated_price_number && (
        <>
          <span className="text-xl text-gray-500 line-through">
            ₹{highestPrice}.00
          </span>

          {/* Discount Percentage */}
          {discountPercentage && (
            <span className="text-lg font-medium text-green-600">
              {discountPercentage}% OFF
            </span>
          )}
        </>
      )}
    </div>
  )
}



// import { clx } from "@medusajs/ui"
// import { getProductPrice } from "@lib/util/get-product-price"
// import { HttpTypes } from "@medusajs/types"

// export default function ProductPrice({
//   product,
//   variant,
// }: {
//   product: HttpTypes.StoreProduct
//   variant?: HttpTypes.StoreProductVariant
// }) {
//   const { cheapestPrice, variantPrice } = getProductPrice({
//     product,
//     variantId: variant?.id,
//   })

//   const highestPrice = Math.max(
//     ...(
//       product?.variants?.flatMap(v =>
//         v.prices?.map(price => price.amount) ?? []
//       ) ?? [0]
//     )
//   )

//   const selectedPrice = variant ? variantPrice : cheapestPrice

//   if (!selectedPrice) {
//     return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
//   }

//   // Calculate percentage discount from highestPrice
//   const discountPercentage =
//     highestPrice && highestPrice > selectedPrice.calculated_price_number
//       ? Math.round(
//         ((highestPrice - selectedPrice.calculated_price_number) / highestPrice) * 100
//       )
//       : null

//   return (
//     <div className="flex items-center gap-2">
//       {/* Current Price */}
//       <span className="text-2xl font-semibold text-gray-900">
//         {cheapestPrice?.calculated_price}
//       </span>

//       {/* Strikethrough Price (Highest Price) */}
//       {highestPrice && highestPrice > cheapestPrice?.calculated_price_number && (
//         <>
//           <span className="text-xl text-gray-500 line-through">
//             ₹{highestPrice}.00
//           </span>
          
//           {/* Discount Percentage */}
//           {/* <span className="text-lg font-medium text-green-600">
//             {Math.round(
//               ((highestPrice - cheapestPrice.calculated_price_number) /
//                 highestPrice) *
//               100
//             )}
//             % OFF
//           </span> */}
//         </>
//       )}
//     </div>

//   )
// }
