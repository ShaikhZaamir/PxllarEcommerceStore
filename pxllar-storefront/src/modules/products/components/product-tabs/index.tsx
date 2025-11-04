// "use client"

// import Back from "@modules/common/icons/back"
// import FastDelivery from "@modules/common/icons/fast-delivery"
// import Refresh from "@modules/common/icons/refresh"

// import Accordion from "./accordion"
// import { HttpTypes } from "@medusajs/types"

// type ProductTabsProps = {
//   product: HttpTypes.StoreProduct
// }

// const ProductTabs = ({ product }: ProductTabsProps) => {
//   const tabs = [
//     {
//       label: "Product Information",
//       component: <ProductInfoTab product={product} />,
//     },
//     {
//       label: "Shipping & Returns",
//       component: <ShippingInfoTab />,
//     },
//   ]

//   return (
//     <div className="w-full">
//       <Accordion type="multiple">
//         {tabs.map((tab, i) => (
//           <Accordion.Item
//             key={i}
//             title={tab.label}
//             headingSize="medium"
//             value={tab.label}
//           >
//             {tab.component}
//           </Accordion.Item>
//         ))}
//       </Accordion>
//     </div>
//   )
// }

// const ProductInfoTab = ({ product }: ProductTabsProps) => {
//   return (
//     <div className="text-small-regular py-8">
//       <div className="grid grid-cols-2 gap-x-8">
//         <div className="flex flex-col gap-y-4">
//           <div>
//             <span className="font-semibold">Material</span>
//             <p>{product.material ? product.material : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Country of origin</span>
//             <p>{product.origin_country ? product.origin_country : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Type</span>
//             <p>{product.type ? product.type.value : "-"}</p>
//           </div>
//         </div>
//         <div className="flex flex-col gap-y-4">
//           <div>
//             <span className="font-semibold">Weight</span>
//             <p>{product.weight ? `${product.weight} g` : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Dimensions</span>
//             <p>
//               {product.length && product.width && product.height
//                 ? `${product.length}L x ${product.width}W x ${product.height}H`
//                 : "-"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ShippingInfoTab = () => {
//   return (
//     <div className="text-small-regular py-8">
//       <div className="grid grid-cols-1 gap-y-8">
//         <div className="flex items-start gap-x-2">
//           <FastDelivery />
//           <div>
//             <span className="font-semibold">Fast delivery</span>
//             <p className="max-w-sm">
//               Your package will arrive in 3-5 business days at your pick up
//               location or in the comfort of your home.
//             </p>
//           </div>
//         </div>
//         <div className="flex items-start gap-x-2">
//           <Refresh />
//           <div>
//             <span className="font-semibold">Simple exchanges</span>
//             <p className="max-w-sm">
//               Is the fit not quite right? No worries - we&apos;ll exchange your
//               product for a new one.
//             </p>
//           </div>
//         </div>
//         <div className="flex items-start gap-x-2">
//           <Back />
//           <div>
//             <span className="font-semibold">Easy returns</span>
//             <p className="max-w-sm">
//               Just return your product and we&apos;ll refund your money. No
//               questions asked – we&apos;ll do our best to make sure your return
//               is hassle-free.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductTabs

"use client"

import Separator from "@modules/common/components/divider"
import { Truck, RotateCcw, Shield } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { Card, CardContent } from "components/ui/card"
import { Badge } from "components/ui/badge"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct & {
    shippingInfo?: {
      freeShipping?: boolean
      estimatedDelivery?: string
      returnPolicy?: string
    }
  }
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <div className="w-full space-y-6">
      <ShippingInfoCard product={product} />
      <ProductInfoCard product={product} />
    </div>
  )
}

const ProductInfoCard = ({ product }: ProductTabsProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6 text  -regular">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Material</span>
              <span className="font-medium">{product.material ? product.material : "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Origin</span>
              <span className="font-medium">{product.origin_country ? product.origin_country : "India"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Sold by</span>
              <span className="font-medium">{product?.type?.value ? product?.type?.value : "Pxllar Store"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ShippingInfoCard = ({ product }: ProductTabsProps) => {
  // Provide fallback values if product.shippingInfo is missing
  const shippingInfo = product.shippingInfo || {}

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Truck className="h-4 w-4 text-green-600" />
          <div>
            <p className="font-medium">
              Free Shipping
            </p>
            <p className="text-sm text-muted-foreground">
              Estimated delivery: 3-5 business days
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <RotateCcw className="h-4 w-4 text-blue-600" />
          <div>
            <p className="font-medium">Easy Returns</p>
            <p className="text-sm text-muted-foreground">30-day return policy</p>
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
  )
}

export default ProductTabs
