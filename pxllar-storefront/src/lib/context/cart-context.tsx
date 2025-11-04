"use client"

import { sdk } from "@lib/config"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface CartItem {
  id: string
  productId: string
  variantId: string
  name: string
  variantName?: string
  price: number
  quantity: number
  total: number
  image: string
  slug: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: { variantId: string; quantity?: number }) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  itemCount: number
  isLoading: boolean
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [currency, setCurrency] = useState("INR")
  const [isLoading, setIsLoading] = useState(false)

  // 🔹 Refresh cart
  const refreshCart = async () => {
    try {
      setIsLoading(true)

      let cartId = localStorage.getItem("cart_id")
      let cart

      if (cartId) {
        try {
          cart = await sdk.store.cart.retrieve(cartId)
        } catch {
          // Cart not found or expired → create new
          cart = await sdk.store.cart.create()
          localStorage.setItem("cart_id", cart.id)
        }
      } else {
        cart = await sdk.store.cart.create()
        localStorage.setItem("cart_id", cart.id)
      }

      setItems(cart.items || [])
      setSubtotal(cart.subtotal || 0)
      setTax(cart.tax_total || 0)
      setShipping(cart.shipping_total || 0)
      setDiscount(cart.discount_total || 0)
      setTotal(cart.total || 0)
      setCurrency(cart.region?.currency_code?.toUpperCase() || "INR")

      // 🔔 Notify listeners (e.g., CartDropdown)
      window.dispatchEvent(new Event("cart-updated"))
    } catch (error) {
      console.error("Error refreshing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Add item
  const addItem = async (item: { variantId: string; quantity?: number }) => {
    try {
      setIsLoading(true)

      let cartId = localStorage.getItem("cart_id")
      let cart

      if (cartId) {
        cart = await sdk.store.cart.addLineItems(cartId, [
          { variant_id: item.variantId, quantity: item.quantity || 1 },
        ])
      } else {
        cart = await sdk.store.cart.create({
          items: [{ variant_id: item.variantId, quantity: item.quantity || 1 }],
        })
        localStorage.setItem("cart_id", cart.id)
      }

      setItems(cart.items || [])
      setSubtotal(cart.subtotal || 0)
      setTotal(cart.total || 0)

      window.dispatchEvent(new Event("cart-updated"))
    } catch (error) {
      console.error("Error adding item to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Remove item
  const removeItem = async (id: string) => {
    try {
      setIsLoading(true)
      const cartId = localStorage.getItem("cart_id")
      if (!cartId) return

      const cart = await sdk.store.cart.removeLineItem(cartId, id)
      setItems(cart.items || [])
      setSubtotal(cart.subtotal || 0)
      setTotal(cart.total || 0)

      window.dispatchEvent(new Event("cart-updated"))
    } catch (error) {
      console.error("Error removing item from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Update quantity
  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setIsLoading(true)
      const cartId = localStorage.getItem("cart_id")
      if (!cartId) return

      const cart = await sdk.store.cart.updateLineItem(cartId, id, {
        quantity,
      })

      setItems(cart.items || [])
      setSubtotal(cart.subtotal || 0)
      setTotal(cart.total || 0)

      window.dispatchEvent(new Event("cart-updated"))
    } catch (error) {
      console.error("Error updating item quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Clear cart
  const clearCart = async () => {
    try {
      setIsLoading(true)
      const cartId = localStorage.getItem("cart_id")
      if (!cartId) return

      const cart = await sdk.store.cart.delete(cartId)
      setItems([])
      setSubtotal(0)
      setTax(0)
      setShipping(0)
      setDiscount(0)
      setTotal(0)

      // Remove cart_id to force new cart next time
      localStorage.removeItem("cart_id")

      window.dispatchEvent(new Event("cart-updated"))
    } catch (error) {
      console.error("Error clearing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        currency,
        itemCount,
        isLoading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}



// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"

// interface CartItem {
//     id: string
//     productId: string
//     variantId: string
//     name: string
//     variantName?: string
//     price: number
//     quantity: number
//     total: number
//     image: string
//     slug: string
// }

// interface CartContextType {
//     items: CartItem[]
//     addItem: (item: { variantId: string; quantity?: number }) => Promise<void>
//     removeItem: (id: string) => Promise<void>
//     updateQuantity: (id: string, quantity: number) => Promise<void>
//     clearCart: () => Promise<void>
//     subtotal: number
//     tax: number
//     shipping: number
//     discount: number
//     total: number
//     currency: string
//     itemCount: number
//     isLoading: boolean
//     refreshCart: () => Promise<void>
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: React.ReactNode }) {
//     const [items, setItems] = useState<CartItem[]>([])
//     const [subtotal, setSubtotal] = useState(0)
//     const [tax, setTax] = useState(0)
//     const [shipping, setShipping] = useState(0)
//     const [discount, setDiscount] = useState(0)
//     const [total, setTotal] = useState(0)
//     const [currency, setCurrency] = useState("INR")
//     const [isLoading, setIsLoading] = useState(false)

//     const refreshCart = async () => {
//         try {
//             setIsLoading(true)
//             const response = await fetch("/api/cart")
//             if (response.ok) {
//                 const data = await response.json()
//                 const cart = data.cart

//                 setItems(cart.items || [])
//                 setSubtotal(cart.subtotal || 0)
//                 setTax(cart.tax || 0)
//                 setShipping(cart.shipping || 0)
//                 setDiscount(cart.discount || 0)
//                 setTotal(cart.total || 0)
//                 setCurrency(cart.currency || "INR")
//             }
//         } catch (error) {
//             console.error("Error refreshing cart:", error)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     useEffect(() => {
//         refreshCart()
//     }, [])

//     const addItem = async (item: { variantId: string; quantity?: number }) => {
//         try {
//             setIsLoading(true)
//             const response = await fetch("/api/cart", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     variant_id: item.variantId,
//                     quantity: item.quantity || 1,
//                 }),
//             })

//             if (response.ok) {
//                 const data = await response.json()
//                 const cart = data.cart

//                 setItems(cart.items || [])
//                 setSubtotal(cart.subtotal || 0)
//                 setTax(cart.tax || 0)
//                 setShipping(cart.shipping || 0)
//                 setDiscount(cart.discount || 0)
//                 setTotal(cart.total || 0)
//                 setCurrency(cart.currency || "INR")
//             } else {
//                 const errorData = await response.json()
//                 throw new Error(errorData.error || "Failed to add item to cart")
//             }
//         } catch (error) {
//             console.error("Error adding item to cart:", error)
//             throw error
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const removeItem = async (id: string) => {
//         try {
//             setIsLoading(true)
//             const response = await fetch(`/api/cart/items/${id}`, {
//                 method: "DELETE",
//             })

//             if (response.ok) {
//                 await refreshCart()
//             } else {
//                 throw new Error("Failed to remove item from cart")
//             }
//         } catch (error) {
//             console.error("Error removing item from cart:", error)
//             throw error
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const updateQuantity = async (id: string, quantity: number) => {
//         try {
//             setIsLoading(true)
//             const response = await fetch(`/api/cart/items/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ quantity }),
//             })

//             if (response.ok) {
//                 await refreshCart()
//             } else {
//                 throw new Error("Failed to update item quantity")
//             }
//         } catch (error) {
//             console.error("Error updating item quantity:", error)
//             throw error
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const clearCart = async () => {
//         try {
//             setIsLoading(true)
//             const response = await fetch("/api/cart", {
//                 method: "DELETE",
//             })

//             if (response.ok) {
//                 setItems([])
//                 setSubtotal(0)
//                 setTax(0)
//                 setShipping(0)
//                 setDiscount(0)
//                 setTotal(0)
//             } else {
//                 throw new Error("Failed to clear cart")
//             }
//         } catch (error) {
//             console.error("Error clearing cart:", error)
//             throw error
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

//     return (
//         <CartContext.Provider
//             value={{
//                 items,
//                 addItem,
//                 removeItem,
//                 updateQuantity,
//                 clearCart,
//                 subtotal,
//                 tax,
//                 shipping,
//                 discount,
//                 total,
//                 currency,
//                 itemCount,
//                 isLoading,
//                 refreshCart,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     )
// }

// export function useCart() {
//     const context = useContext(CartContext)
//     if (context === undefined) {
//         throw new Error("useCart must be used within a CartProvider")
//     }
//     return context
// }
