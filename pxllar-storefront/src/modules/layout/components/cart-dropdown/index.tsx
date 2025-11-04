'use client'

import { ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"

type CartDropdownProps = {
  cart: any
  loading: boolean
}

const CartDropdown = ({ cart, loading }: CartDropdownProps) => {
  const totalItems = cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0
  const subtotal = cart?.subtotal ?? 0

  return (
    <div className="h-full z-50">
      <LocalizedClientLink
        href="/cart"
        className="flex items-center rounded-full py-1 text-sm bg-transparent transition"
      >
        <ShoppingCart className="h-4 w-4" />
        {!loading && totalItems > 0 && (
          <span className="ml-1 rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
            {totalItems}
          </span>
        )}
      </LocalizedClientLink>
    </div>
  )
}

export default CartDropdown









// "use client"

// import {
//   Popover,
//   PopoverButton,
//   PopoverPanel,
//   Transition,
// } from "@headlessui/react"
// import { convertToLocale } from "@lib/util/money"
// import { Button } from "@medusajs/ui"
// import DeleteButton from "@modules/common/components/delete-button"
// import LineItemOptions from "@modules/common/components/line-item-options"
// import { ShoppingCart } from "lucide-react"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Thumbnail from "@modules/products/components/thumbnail"
// import { usePathname } from "next/navigation"
// import { Fragment, useEffect, useRef, useState } from "react"
// import { cn } from "@lib/utils"

// // Simple cart fetcher (replace YOUR_STORE_URL with your Medusa server URL)
// async function getCart(cartId: string | null) {
//   if (!cartId) return null // return early if no cartId

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
//       credentials: "include",
//     })
//     if (!res.ok) throw new Error("Failed to fetch cart")
//     const data = await res.json()
//     return data.cart
//   } catch (err) {
//     console.error("Error fetching cart:", err)
//     return null
//   }
// }


// const CartDropdown = () => {
//   const [cart, setCart] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>()
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

//   const open = () => setCartDropdownOpen(true)
//   const close = () => setCartDropdownOpen(false)

//   const totalItems =
//     cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0

//   const subtotal = cart?.subtotal ?? 0
//   const itemRef = useRef<number>(totalItems || 0)

//   const timedOpen = () => {
//     open()
//     const timer = setTimeout(close, 5000)
//     setActiveTimer(timer)
//   }

//   const openAndCancel = () => {
//     if (activeTimer) {
//       clearTimeout(activeTimer)
//     }
//     open()
//   }

//   // Cleanup timer
//   useEffect(() => {
//     return () => {
//       if (activeTimer) {
//         clearTimeout(activeTimer)
//       }
//     }
//   }, [activeTimer])

//   const pathname = usePathname()

//   // Fetch cart on mount
//   useEffect(() => {
//     const cartId = localStorage.getItem("cart_id")
//     if (!cartId) {
//       setLoading(false)
//       return
//     }

//     const fetchData = async () => {
//       const fetchedCart = await getCart(cartId)
//       setCart(fetchedCart)
//       setLoading(false)
//     }

//     fetchData()
//   }, [])

//   // Re-fetch when cart is updated
//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       const cartId = localStorage.getItem("cart_id")
//       if (!cartId) return
//       const updatedCart = await getCart(cartId)
//       if (updatedCart) setCart(updatedCart)
//     }

//     window.addEventListener("cart-updated", handleCartUpdate)

//     return () => {
//       window.removeEventListener("cart-updated", handleCartUpdate)
//     }
//   }, [])

//   // Detect cart changes (refresh when quantity changes)
//   useEffect(() => {
//     if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
//       timedOpen()
//     }
//     itemRef.current = totalItems
//   }, [totalItems, pathname])

//   return (
//     <div
//       className="h-full z-50"
//       onMouseEnter={openAndCancel}
//       onMouseLeave={close}
//     >
//       <Popover className="relative h-full">
//         <PopoverButton>
//           <LocalizedClientLink
//             href="/cart"
//             className="flex items-center rounded-full py-1 text-sm bg-transparent transition"
//           >
//             <ShoppingCart className="h-4 w-4" />
//             {!loading && totalItems > 0 && (
//               <span className="ml-1 rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
//                 {totalItems}
//               </span>
//             )}
//           </LocalizedClientLink>
//         </PopoverButton>

//         <Transition
//           show={cartDropdownOpen}
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <PopoverPanel
//             static
//             className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
//             data-testid="nav-cart-dropdown"
//           >
//             <div className="p-4 flex items-center justify-center">
//               <h3 className="text-large-semi">Cart</h3>
//             </div>
//             {cart && cart.items?.length ? (
//               <>
//                 <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
//                   {cart.items
//                     .sort((a: any, b: any) =>
//                       (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
//                     )
//                     .map((item: any) => (
//                       <div
//                         className="grid grid-cols-[122px_1fr] gap-x-4"
//                         key={item.id}
//                         data-testid="cart-item"
//                       >
//                         <LocalizedClientLink
//                           href={`/products/${item.product_handle}`}
//                           className="w-24"
//                         >
//                           <Thumbnail
//                             thumbnail={item.thumbnail}
//                             images={item.variant?.product?.images}
//                             size="square"
//                           />
//                         </LocalizedClientLink>
//                         <div className="flex flex-col justify-between flex-1">
//                           <div className="flex flex-col flex-1">
//                             <div className="flex items-start justify-between">
//                               <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
//                                 <h3 className="text-base-regular overflow-hidden text-ellipsis">
//                                   <LocalizedClientLink
//                                     href={`/products/${item.product_handle}`}
//                                     data-testid="product-link"
//                                   >
//                                     {item.title}
//                                   </LocalizedClientLink>
//                                 </h3>
//                                 <LineItemOptions
//                                   variant={item.variant}
//                                   data-testid="cart-item-variant"
//                                 />
//                                 <span
//                                   data-testid="cart-item-quantity"
//                                   data-value={item.quantity}
//                                 >
//                                   Quantity: {item.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex justify-end">
//                                 <LineItemPrice
//                                   item={item}
//                                   style="tight"
//                                   currencyCode={cart.currency_code}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <DeleteButton
//                             id={item.id}
//                             className="mt-1"
//                             data-testid="cart-item-remove-button"
//                           >
//                             Remove
//                           </DeleteButton>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//                 <div className="p-4 flex flex-col gap-y-4 text-small-regular">
//                   <div className="flex items-center justify-between">
//                     <span className="text-ui-fg-base font-semibold">
//                       Subtotal{" "}
//                       <span className="font-normal">(excl. taxes)</span>
//                     </span>
//                     <span
//                       className="text-large-semi"
//                       data-testid="cart-subtotal"
//                       data-value={subtotal}
//                     >
//                       {convertToLocale({
//                         amount: subtotal,
//                         currency_code: cart.currency_code,
//                       })}
//                     </span>
//                   </div>
//                   <LocalizedClientLink href="/cart" passHref>
//                     <Button className="w-full" size="large">
//                       Go to cart
//                     </Button>
//                   </LocalizedClientLink>
//                 </div>
//               </>
//             ) : (
//               <div>
//                 <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
//                   <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
//                     <span>0</span>
//                   </div>
//                   <span>Your shopping bag is empty.</span>
//                   <div>
//                     <LocalizedClientLink href="/store">
//                       <Button onClick={close}>Explore products</Button>
//                     </LocalizedClientLink>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </PopoverPanel>
//         </Transition>
//       </Popover>
//     </div>
//   )
// }

// export default CartDropdown




// 'use client'

// import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
// import { Fragment, useEffect, useState } from "react"
// import { ShoppingCart } from "lucide-react"
// import { Button } from "@medusajs/ui"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import Thumbnail from "@modules/products/components/thumbnail"
// import DeleteButton from "@modules/common/components/delete-button"

// interface CartDropdownProps {
//   cart: any
//   totalItems: number
//   loading: boolean
// }

// const CartDropdown = ({ cart, totalItems, loading }: CartDropdownProps) => {
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
//   const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>()

//   const open = () => setCartDropdownOpen(true)
//   const close = () => setCartDropdownOpen(false)

//   const timedOpen = () => {
//     open()
//     const timer = setTimeout(close, 5000)
//     setActiveTimer(timer)
//   }

//   const openAndCancel = () => {
//     if (activeTimer) clearTimeout(activeTimer)
//     open()
//   }

//   useEffect(() => {
//     return () => {
//       if (activeTimer) clearTimeout(activeTimer)
//     }
//   }, [activeTimer])

//   // Auto-open dropdown briefly when item count changes
//   useEffect(() => {
//     if (totalItems > 0) timedOpen()
//   }, [totalItems])

//   const subtotal = cart?.subtotal ?? 0
//   const currency = cart?.region?.currency_code ?? "INR"

//   return (
//     <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
//       <Popover className="relative h-full">
//         <PopoverButton>
//           <LocalizedClientLink
//             href="/cart"
//             className="flex items-center rounded-full py-1 text-sm bg-transparent transition"
//           >
//             <ShoppingCart className="h-4 w-4" />
//             {!loading && totalItems > 0 && (
//               <span className="ml-1 rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
//                 {totalItems}
//               </span>
//             )}
//           </LocalizedClientLink>
//         </PopoverButton>

//         <Transition
//           show={cartDropdownOpen}
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <PopoverPanel
//             static
//             className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
//             data-testid="nav-cart-dropdown"
//           >
//             <div className="p-4 flex items-center justify-center">
//               <h3 className="text-large-semi">Cart</h3>
//             </div>

//             {cart?.items?.length ? (
//               <>
//                 <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
//                   {cart.items.map((item: any) => (
//                     <div key={item.id} className="grid grid-cols-[122px_1fr] gap-x-4">
//                       <LocalizedClientLink href={`/products/${item.slug}`} className="w-24">
//                         <Thumbnail thumbnail={item.image} size="square" />
//                       </LocalizedClientLink>
//                       <div className="flex flex-col justify-between flex-1">
//                         <div className="flex justify-between">
//                           <div>
//                             <h3 className="text-base-regular overflow-hidden text-ellipsis">
//                               {item.name}
//                             </h3>
//                             <span>Quantity: {item.quantity}</span>
//                           </div>
//                           <div>
//                             <LineItemPrice item={item} style="tight" currencyCode={currency} />
//                           </div>
//                         </div>
//                         <DeleteButton
//                           id={item.id}
//                           className="mt-1"
//                           onClick={async () => {
//                             // Remove item directly via API (from your useCart hook)
//                             await fetch(`/api/cart/items/${item.id}`, { method: "DELETE" })
//                             window.dispatchEvent(new Event("pxllar_cart_updated")) // trigger reactive updates
//                           }}
//                         >
//                           Remove
//                         </DeleteButton>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="p-4 flex flex-col gap-y-4 text-small-regular">
//                   <div className="flex items-center justify-between">
//                     <span className="text-ui-fg-base font-semibold">
//                       Subtotal <span className="font-normal">(excl. taxes)</span>
//                     </span>
//                     <span className="text-large-semi" data-value={subtotal}>
//                       {subtotal} {currency}
//                     </span>
//                   </div>
//                   <LocalizedClientLink href="/cart" passHref>
//                     <Button className="w-full" size="large">
//                       Go to cart
//                     </Button>
//                   </LocalizedClientLink>
//                 </div>
//               </>
//             ) : (
//               <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
//                 <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
//                   <span>0</span>
//                 </div>
//                 <span>Your shopping bag is empty.</span>
//                 <LocalizedClientLink href="/store">
//                   <Button onClick={close}>Explore products</Button>
//                 </LocalizedClientLink>
//               </div>
//             )}
//           </PopoverPanel>
//         </Transition>
//       </Popover>
//     </div>
//   )
// }

// export default CartDropdown




// "use client"

// import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
// import { Fragment, useEffect, useState } from "react"
// import { ShoppingCart } from "lucide-react"
// import { Button } from "@medusajs/ui"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import Thumbnail from "@modules/products/components/thumbnail"
// import DeleteButton from "@modules/common/components/delete-button"
// import { useCart } from "@lib/context/cart-context"

// const CartDropdown = () => {
//   const { items, subtotal, currency, refreshCart, removeItem } = useCart()
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
//   const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>()

//   const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

//   const open = () => setCartDropdownOpen(true)
//   const close = () => setCartDropdownOpen(false)

//   const timedOpen = () => {
//     open()
//     const timer = setTimeout(close, 5000)
//     setActiveTimer(timer)
//   }

//   const openAndCancel = () => {
//     if (activeTimer) clearTimeout(activeTimer)
//     open()
//   }

//   // Cleanup timer
//   useEffect(() => {
//     return () => {
//       if (activeTimer) clearTimeout(activeTimer)
//     }
//   }, [activeTimer])

//   // Listen for cart updates
//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       await refreshCart() // always safe: refreshCart handles cart creation if missing
//     }

//     window.addEventListener("cart-updated", handleCartUpdate)
//     return () => window.removeEventListener("cart-updated", handleCartUpdate)
//   }, [refreshCart])

//   // Show dropdown if item count changes
//   useEffect(() => {
//     if (totalItems > 0) timedOpen()
//   }, [totalItems])

//   return (
//     <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
//       <Popover className="relative h-full">
//         <PopoverButton>
//           <LocalizedClientLink
//             href="/cart"
//             className="flex items-center rounded-full py-1 text-sm bg-transparent transition"
//           >
//             <ShoppingCart className="h-4 w-4" />
//             {totalItems > 0 && (
//               <span className="ml-1 rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
//                 {totalItems}
//               </span>
//             )}
//           </LocalizedClientLink>
//         </PopoverButton>

//         <Transition
//           show={cartDropdownOpen}
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <PopoverPanel
//             static
//             className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
//             data-testid="nav-cart-dropdown"
//           >
//             <div className="p-4 flex items-center justify-center">
//               <h3 className="text-large-semi">Cart</h3>
//             </div>

//             {items.length ? (
//               <>
//                 <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
//                   {items.map(item => (
//                     <div key={item.id} className="grid grid-cols-[122px_1fr] gap-x-4">
//                       <LocalizedClientLink href={`/products/${item.slug}`} className="w-24">
//                         <Thumbnail thumbnail={item.image} size="square" />
//                       </LocalizedClientLink>
//                       <div className="flex flex-col justify-between flex-1">
//                         <div className="flex justify-between">
//                           <div>
//                             <h3 className="text-base-regular overflow-hidden text-ellipsis">
//                               {item.name}
//                             </h3>
//                             <span>Quantity: {item.quantity}</span>
//                           </div>
//                           <div>
//                             <LineItemPrice item={item} style="tight" currencyCode={currency} />
//                           </div>
//                         </div>
//                         <DeleteButton
//                           id={item.id}
//                           className="mt-1"
//                           onClick={() => removeItem(item.id)}
//                         >
//                           Remove
//                         </DeleteButton>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="p-4 flex flex-col gap-y-4 text-small-regular">
//                   <div className="flex items-center justify-between">
//                     <span className="text-ui-fg-base font-semibold">
//                       Subtotal <span className="font-normal">(excl. taxes)</span>
//                     </span>
//                     <span className="text-large-semi" data-value={subtotal}>
//                       {subtotal} {currency}
//                     </span>
//                   </div>
//                   <LocalizedClientLink href="/cart" passHref>
//                     <Button className="w-full" size="large">
//                       Go to cart
//                     </Button>
//                   </LocalizedClientLink>
//                 </div>
//               </>
//             ) : (
//               <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
//                 <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
//                   <span>0</span>
//                 </div>
//                 <span>Your shopping bag is empty.</span>
//                 <LocalizedClientLink href="/store">
//                   <Button onClick={close}>Explore products</Button>
//                 </LocalizedClientLink>
//               </div>
//             )}
//           </PopoverPanel>
//         </Transition>
//       </Popover>
//     </div>
//   )
// }

// export default CartDropdown

