'use client'

import useCart from "@lib/hooks/use-cart"
import CartDropdown from "../cart-dropdown"

export default function CartButton() {
  const { cart, loading } = useCart() // reactive cart state

  return <CartDropdown cart={cart} loading={loading} />
}



// 'use client'

// import { useEffect, useState } from "react"
// import { retrieveCart } from "@lib/data/cart"
// import CartDropdown from "../cart-dropdown"

// export default function CartButton() {
//   const [cart, setCart] = useState(null)

//   useEffect(() => {
//     async function fetchCart() {
//       try {
//         const data = await retrieveCart()
//         setCart(data)
//       } catch (err) {
//         console.error("Error retrieving cart:", err)
//         setCart(null)
//       }
//     }

//     fetchCart()
//   }, [])

//   return <CartDropdown cart={cart} />
// }
