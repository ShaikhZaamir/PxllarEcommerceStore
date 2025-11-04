// lib/data/inventory.ts
import { sdk } from "@lib/config"

export async function getInventoryStatus(variantId: string) {
    try {
        const { variant } = await sdk.store.variants.retrieve(variantId)

        const tracked = variant.inventory_management !== null
        const backordersAllowed = variant.allow_backorder
        const quantity = variant.inventory_quantity ?? 0

        let inStock = false

        if (!tracked) {
            inStock = true
        } else if (backordersAllowed) {
            inStock = true
        } else if (tracked && quantity > 0) {
            inStock = true
        }

        return {
            inStock,
            quantity,
            tracked,
            backordersAllowed,
        }
    } catch (err) {
        console.error("Error fetching inventory:", err)
        return { inStock: false, quantity: 0, tracked: false, backordersAllowed: false }
    }
}
