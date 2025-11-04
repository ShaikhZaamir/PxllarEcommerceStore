"use client"

import { Input } from "components/ui/input"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

type ProductSearchProps = {
    products: any[] // You can replace this with a custom product type later
    onSearchResults: (results: any[]) => void
}

export const ProductSearch = ({
    products,
    onSearchResults,
}: ProductSearchProps) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value

        const filtered = products.filter((product) =>
            product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        onSearchResults(filtered)

        const params = new URLSearchParams(searchParams)
        if (searchTerm) {
            params.set("q", searchTerm)
        } else {
            params.delete("q")
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
                className="w-full appearance-none pl-8"
                placeholder="Search products..."
                onChange={handleSearch}
                defaultValue={searchParams.get("q") || ""}
            />
        </div>
    )
}