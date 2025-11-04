"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
    MedusaCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    createCart,
    getCart,
} from "@lib/medusa"

type UseCartReturn = {
    cart: MedusaCart | null
    loading: boolean
    error: Error | null
    refresh: () => Promise<void>
    addItem: (variantId: string, quantity: number) => Promise<void>
    updateItem: (lineItemId: string, quantity: number) => Promise<void>
    removeItem: (lineItemId: string) => Promise<void>
}

export default function useCart({ pollInterval = 2000 } = {}): UseCartReturn {
    const [cart, setCart] = useState<MedusaCart | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const intervalRef = useRef<number | null>(null)

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            let cartId: string | null = null

            if (typeof window !== "undefined") {
                cartId = localStorage.getItem("pxllar_cart_id")
                if (!cartId || cartId === "undefined" || cartId === "null") {
                    cartId = null
                }
            }

            let activeCart: MedusaCart | null = null

            if (cartId) {
                activeCart = await getCart(cartId)
            }

            if (!activeCart) {
                activeCart = await createCart()
                if (typeof window !== "undefined" && activeCart?.id) {
                    localStorage.setItem("pxllar_cart_id", activeCart.id)
                }
            }

            setCart(activeCart)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])

    // ---- Actions ----
    const addItem = useCallback(
        async (variantId: string, quantity: number) => {
            if (!cart) await fetchCart()
            if (!cart) return

            const updated = await addToCart(cart.id, variantId, quantity)
            setCart(updated)
            localStorage.setItem("pxllar_cart_updated", Date.now().toString())
        },
        [cart, fetchCart]
    )

    const updateItem = useCallback(
        async (lineItemId: string, quantity: number) => {
            if (!cart) return
            const updated = await updateCartItem(cart.id, lineItemId, quantity)
            setCart(updated)
            localStorage.setItem("pxllar_cart_updated", Date.now().toString())
        },
        [cart]
    )

    const removeItem = useCallback(
        async (lineItemId: string) => {
            if (!cart) return
            const updated = await removeFromCart(cart.id, lineItemId)
            setCart(updated)
            localStorage.setItem("pxllar_cart_updated", Date.now().toString())
        },
        [cart]
    )

    // ---- Effects ----
    useEffect(() => {
        fetchCart()
        if (pollInterval && pollInterval > 0) {
            intervalRef.current = window.setInterval(
                fetchCart,
                pollInterval
            ) as unknown as number
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current)
            }
        }
    }, [fetchCart, pollInterval])

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (!e.key) return
            if (
                e.key === "pxllar_cart_updated" ||
                e.key === "pxllar_cart_id" ||
                e.key === "cart_id"
            ) {
                fetchCart()
            }
        }
        window.addEventListener("storage", onStorage)
        return () => window.removeEventListener("storage", onStorage)
    }, [fetchCart])

    return {
        cart,
        loading,
        error,
        refresh: fetchCart,
        addItem,
        updateItem,
        removeItem,
    }
}



// "use client"

// import { createCart, getCart, MedusaCart } from "@lib/medusa"
// import { useCallback, useEffect, useRef, useState } from "react"

// type UseCartReturn = {
//   cart: MedusaCart | null
//   loading: boolean
//   error: Error | null
//   refresh: () => Promise<void>
// }

// export default function useCart({ pollInterval = 2000 } = {}): UseCartReturn {
//   const [cart, setCart] = useState<MedusaCart | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | null>(null)
//   const intervalRef = useRef<number | null>(null)

//   const fetchCart = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       let cartId: string | null = null

//       if (typeof window !== "undefined") {
//         cartId =
//           localStorage.getItem("pxllar_cart_id") ||
//           localStorage.getItem("cart_id") ||
//           localStorage.getItem("medusa_cart_id")

//         // sanitize invalid values
//         if (!cartId || cartId === "undefined" || cartId === "null") {
//           cartId = null
//         }
//       }

//       let activeCart: MedusaCart | null = null

//       if (cartId) {
//         activeCart = await getCart(cartId)
//       }

//       if (!activeCart) {
//         activeCart = await createCart()
//         if (typeof window !== "undefined" && activeCart?.id) {
//           localStorage.setItem("pxllar_cart_id", activeCart.id)
//         }
//       }

//       setCart(activeCart)
//     } catch (err: any) {
//       setError(err)
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   // initial fetch + polling
//   useEffect(() => {
//     fetchCart()
//     if (pollInterval && pollInterval > 0) {
//       intervalRef.current = window.setInterval(
//         fetchCart,
//         pollInterval
//       ) as unknown as number
//       return () => {
//         if (intervalRef.current) clearInterval(intervalRef.current)
//       }
//     }
//   }, [fetchCart, pollInterval])

//   // listen for localStorage events (sync across tabs)
//   useEffect(() => {
//     const onStorage = (e: StorageEvent) => {
//       if (!e.key) return
//       if (
//         e.key === "pxllar_cart_updated" ||
//         e.key === "pxllar_cart_id" ||
//         e.key === "cart_id"
//       ) {
//         fetchCart()
//       }
//     }
//     window.addEventListener("storage", onStorage)
//     return () => window.removeEventListener("storage", onStorage)
//   }, [fetchCart])

//   return { cart, loading, error, refresh: fetchCart }
// }

