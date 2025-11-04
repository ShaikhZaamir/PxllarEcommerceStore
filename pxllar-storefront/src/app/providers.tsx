// app/providers.tsx
"use client"

import { CartProvider } from "lib/context/cart-context"

export function Providers({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>
}
