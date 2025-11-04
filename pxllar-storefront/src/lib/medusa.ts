import Medusa from "@medusajs/medusa-js"

const MEDUSA_BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    maxRetries: 3,
    publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
})

export interface MedusaProduct {
    id: string
    title: string
    description: string
    handle: string
    thumbnail: string | null
    images: Array<{
        id: string
        url: string
    }>
    variants: Array<{
        id: string
        title: string
        prices: Array<{
            id: string
            amount: number
            currency_code: string
        }>
        inventory_quantity: number
    }>
    collection?: {
        id: string
        title: string
        handle: string
    }
    tags?: Array<{
        id: string
        value: string
    }>
}

export interface MedusaCollection {
    id: string
    title: string
    handle: string
    metadata?: Record<string, any>
}

export interface MedusaCartItem {
    id: string
    cart_id: string
    variant_id: string
    quantity: number
    unit_price: number
    variant: {
        id: string
        title: string
        product: {
            id: string
            title: string
            handle: string
            thumbnail: string | null
        }
    }
}

export interface MedusaCart {
    id: string
    items: MedusaCartItem[]
    total: number
    subtotal: number
    tax_total: number
    shipping_total: number
    region: {
        id: string
        name: string
        currency_code: string
    }
    payment_sessions: any[]
    shipping_methods: any[]
}

// Get all products
export async function getProducts(limit = 20, offset = 0): Promise<MedusaProduct[]> {
    try {
        const { products } = await medusa.products.list({ limit, offset })
        return products as MedusaProduct[]
    } catch (error) {
        console.error("Error fetching products:", error)
        throw new Error("Failed to fetch products from Medusa")
    }
}

// Get single product by handle
export async function getProduct(handle: string): Promise<MedusaProduct | null> {
    try {
        const { products } = await medusa.products.list({ handle })
        return products.length > 0 ? (products[0] as MedusaProduct) : null
    } catch (error) {
        console.error("Error fetching product:", error)
        throw new Error("Failed to fetch product from Medusa")
    }
}

// Get collections
export async function getCollections(limit = 10, offset = 0): Promise<MedusaCollection[]> {
    try {
        const { collections } = await medusa.collections.list({ limit, offset })
        return collections as MedusaCollection[]
    } catch (error) {
        console.error("Error fetching collections:", error)
        throw new Error("Failed to fetch collections from Medusa")
    }
}

// Create cart
export async function createCart(regionId?: string): Promise<MedusaCart> {
    try {
        // Get regions first to use default if none provided
        if (!regionId) {
            const { regions } = await medusa.regions.list()
            regionId = regions[0]?.id
        }

        const { cart } = await medusa.carts.create({ region_id: regionId })
        return cart as MedusaCart
    } catch (error) {
        console.error("Error creating cart:", error)
        throw new Error("Failed to create cart")
    }
}

// Get cart
export async function getCart(cartId: string): Promise<MedusaCart | null> {
    try {
        const { cart } = await medusa.carts.retrieve(cartId)
        return cart as MedusaCart
    } catch (error) {
        console.error("Error fetching cart:", error)
        return null
    }
}

// Add item to cart
export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<MedusaCart> {
    try {
        const { cart } = await medusa.carts.lineItems.create(cartId, {
            variant_id: variantId,
            quantity,
        })
        return cart as MedusaCart
    } catch (error) {
        console.error("Error adding item to cart:", error)
        throw new Error("Failed to add item to cart")
    }
}

// Update cart item
export async function updateCartItem(cartId: string, lineItemId: string, quantity: number): Promise<MedusaCart> {
    try {
        const { cart } = await medusa.carts.lineItems.update(cartId, lineItemId, {
            quantity,
        })
        return cart as MedusaCart
    } catch (error) {
        console.error("Error updating cart item:", error)
        throw new Error("Failed to update cart item")
    }
}

// Remove item from cart
export async function removeFromCart(cartId: string, lineItemId: string): Promise<MedusaCart> {
    try {
        const { cart } = await medusa.carts.lineItems.delete(cartId, lineItemId)
        return cart as MedusaCart
    } catch (error) {
        console.error("Error removing item from cart:", error)
        throw new Error("Failed to remove item from cart")
    }
}

// Get regions (for currency and shipping)
export async function getRegions() {
    try {
        const { regions } = await medusa.regions.list()
        return regions
    } catch (error) {
        console.error("Error fetching regions:", error)
        throw new Error("Failed to fetch regions")
    }
}

// Create payment session
export async function createPaymentSessions(cartId: string) {
    try {
        const { cart } = await medusa.carts.createPaymentSessions(cartId)
        return cart
    } catch (error) {
        console.error("Error creating payment sessions:", error)
        throw new Error("Failed to create payment sessions")
    }
}

// Complete cart (checkout)
export async function completeCart(cartId: string) {
    try {
        const { data } = await medusa.carts.complete(cartId)
        return data
    } catch (error) {
        console.error("Error completing cart:", error)
        throw new Error("Failed to complete cart")
    }
}
