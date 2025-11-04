// pxllar-storefront/src/pages/api/inventory/[variantId].ts

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { variantId } = req.query

    if (typeof variantId !== "string") {
        return res.status(400).json({ error: "Invalid variantId" })
    }

    try {
        const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
        const PUBLISHABLE_API_KEY = process.env.MEDUSA_PUBLISHABLE_API_KEY

        if (!PUBLISHABLE_API_KEY) {
            console.error("Missing MEDUSA_PUBLISHABLE_API_KEY environment variable")
            return res.status(500).json({ error: "Server misconfiguration" })
        }

        const response = await fetch(
            `${MEDUSA_BACKEND_URL}/store/variants/${variantId}`,
            {
                headers: {
                    "x-publishable-api-key": PUBLISHABLE_API_KEY,
                },
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error(
                `Backend fetch failed: ${response.status} - ${response.statusText}`,
                errorText
            )
            return res.status(500).json({ error: `Failed to fetch variant data from backend` })
        }

        const data = await response.json()

        // Return only inventory_quantity or 0 if missing
        const inventory_quantity = data?.variant?.inventory_quantity ?? 0

        return res.status(200).json({ inventory_quantity })
    } catch (error) {
        console.error("Error in /api/inventory/[variantId] handler:", error)
        return res.status(500).json({ error: "Failed to fetch inventory" })
    }
}
