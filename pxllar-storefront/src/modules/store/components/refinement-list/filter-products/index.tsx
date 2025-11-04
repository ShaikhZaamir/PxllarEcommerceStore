"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "components/ui/drawer"
import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { ChevronDown, Users, Tag, Package, X } from "lucide-react"
import { sdk } from "@lib/config"
import { useRouter } from "next/navigation"

type FilterProductsProps = {
    setQueryParams: (name: string, value: string) => void
    searchParams: URLSearchParams
}

const genders = ["men", "women", "unisex"]

type Category = {
    id: string
    name?: string
    title?: string
    handle: string
}

const FilterProducts = ({ setQueryParams, searchParams }: FilterProductsProps) => {
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [collections, setCollections] = useState<Category[]>([])
    const router = useRouter()

    // Fetch categories and collections
    useEffect(() => {
        sdk.client
            .fetch("/store/product-categories?parent_category_id=null", { method: "GET" })
            .then((res: any) => {
                if (res?.product_categories) setCategories(res.product_categories)
            })
            .catch((err) => console.error("❌ Error fetching categories:", err))

        sdk.client
            .fetch("/store/collections", { method: "GET" })
            .then((res: any) => {
                if (res?.collections) setCollections(res.collections)
            })
            .catch((err) => console.error("❌ Error fetching collections:", err))
    }, [])

    const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
        setQueryParams(name, checked ? value : "")
    }

    const clearAllFilters = () => {
        const keysToClear = ["category", "gender", "available", "collection"]

        // Remove each key
        keysToClear.forEach((key) => setQueryParams(key, ""))

        // Push updated URL to refresh UI
        const params = new URLSearchParams(window.location.search)
        keysToClear.forEach((key) => params.delete(key))
        const url = `${window.location.pathname}?${params.toString()}`
        router.push(url)
    }


    const hasActiveFilters =
        searchParams.get("category") ||
        searchParams.get("gender") ||
        searchParams.get("available") ||
        searchParams.get("collection")

    return (
        <>
            {/* 🔘 Desktop Dropdowns with Active Filters Inline */}
            <div className="hidden md:flex items-center gap-4">
                {/* Selected Filters on the Left */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-2">
                        {searchParams.get("category") && (
                            <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm gap-1 capitalize">
                                {searchParams.get("category")}
                                <button onClick={() => handleCheckboxChange("category", "", false)}>&times;</button>
                            </span>
                        )}
                        {searchParams.get("collection") && (
                            <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm gap-1 capitalize">
                                {searchParams.get("collection")}
                                <button onClick={() => handleCheckboxChange("collection", "", false)}>&times;</button>
                            </span>
                        )}
                        {searchParams.get("gender") && (
                            <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm gap-1 capitalize">
                                {searchParams.get("gender")}
                                <button onClick={() => handleCheckboxChange("gender", "", false)}>&times;</button>
                            </span>
                        )}
                        {searchParams.get("available") && (
                            <span className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm gap-1 capitalize">
                                In Stock
                                <button onClick={() => handleCheckboxChange("available", "", false)}>&times;</button>
                            </span>
                        )}
                    </div>
                )}

                {/* Dropdowns */}
                <div className="flex gap-4 items-center">
                    {/* Category Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-300 bg-transparent relative">
                                <Tag className="w-4 h-4 mr-2" />
                                Categories
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
                            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex items-center space-x-2 px-2 py-1.5">
                                    <Checkbox
                                        id={`cat-${cat.id}`}
                                        checked={searchParams.get("category") === cat.handle}
                                        onCheckedChange={(checked) => handleCheckboxChange("category", cat.handle, !!checked)}
                                    />
                                    <label htmlFor={`cat-${cat.id}`} className="text-sm capitalize">
                                        {cat.name || cat.title}
                                    </label>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Collections Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-300 bg-transparent relative">
                                <Package className="w-4 h-4 mr-2" />
                                Collections
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
                            <DropdownMenuLabel>Select Collection</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {collections.map((col) => (
                                <div key={col.id} className="flex items-center space-x-2 px-2 py-1.5">
                                    <Checkbox
                                        id={`col-${col.id}`}
                                        checked={searchParams.get("collection") === col.handle}
                                        onCheckedChange={(checked) => handleCheckboxChange("collection", col.handle, !!checked)}
                                    />
                                    <label htmlFor={`col-${col.id}`} className="text-sm capitalize">
                                        {col.name || col.title}
                                    </label>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Gender Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-300 bg-transparent relative">
                                <Users className="w-4 h-4 mr-2" />
                                Gender
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
                            <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {genders.map((g) => (
                                <div key={g} className="flex items-center space-x-2 px-2 py-1.5">
                                    <Checkbox
                                        id={`gender-${g}`}
                                        checked={searchParams.get("gender") === g}
                                        onCheckedChange={(checked) => handleCheckboxChange("gender", g, !!checked)}
                                    />
                                    <label htmlFor={`gender-${g}`} className="text-sm capitalize">
                                        {g}
                                    </label>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Clear Filters Button */}
                    <Button
                        onClick={clearAllFilters}
                        variant="ghost"
                        className="text-sm text-gray-600 underline underline-offset-4 hover:text-black px-2"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>

            {/* 📱 Mobile Drawer (unchanged) */}
            <div className="md:hidden mt-4 w-full">
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="w-40">
                            Filters
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="p-4 gap-6 mb-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">Filter Products</h3>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-gray-600 hover:text-black flex items-center"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <p className="text-lg font-medium mb-2">Category</p>
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex items-center space-x-2 mb-1">
                                    <Checkbox
                                        id={`cat-${cat.id}`}
                                        checked={searchParams.get("category") === cat.handle}
                                        onCheckedChange={(checked) => handleCheckboxChange("category", cat.handle, !!checked)}
                                    />
                                    <label htmlFor={`cat-${cat.id}`} className="text-base capitalize">
                                        {cat.name || cat.title}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Collections */}
                        <div>
                            <p className="text-lg font-medium mb-2">Collections</p>
                            {collections.map((col) => (
                                <div key={col.id} className="flex items-center space-x-2 mb-1">
                                    <Checkbox
                                        id={`col-${col.id}`}
                                        checked={searchParams.get("collection") === col.handle}
                                        onCheckedChange={(checked) => handleCheckboxChange("collection", col.handle, !!checked)}
                                    />
                                    <label htmlFor={`col-${col.id}`} className="text-base capitalize">
                                        {col.name || col.title}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Gender */}
                        <div>
                            <p className="text-lg font-medium mb-2">Gender</p>
                            {genders.map((g) => (
                                <div key={g} className="flex items-center space-x-2 mb-1">
                                    <Checkbox
                                        id={`gender-${g}`}
                                        checked={searchParams.get("gender") === g}
                                        onCheckedChange={(checked) => handleCheckboxChange("gender", g, !!checked)}
                                    />
                                    <label htmlFor={`gender-${g}`} className="text-base capitalize">
                                        {g}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Availability */}
                        <div>
                            <p className="text-lg font-medium mb-2">Availability</p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="available"
                                    checked={searchParams.get("available") === "true"}
                                    onCheckedChange={(checked) => handleCheckboxChange("available", "true", !!checked)}
                                />
                                <label htmlFor="available" className="text-base">
                                    In Stock Only
                                </label>
                            </div>
                        </div>

                        <DrawerClose asChild>
                            <Button variant="secondary" className="text-base w-full mt-4">
                                Apply Filters
                            </Button>
                        </DrawerClose>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

export default FilterProducts







// "use client"

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "components/ui/dropdown-menu"
// import {
//     Drawer,
//     DrawerContent,
//     DrawerTrigger,
//     DrawerClose,
// } from "components/ui/drawer"
// import { useState } from "react"
// import { Button } from "components/ui/button"
// import { Checkbox } from "components/ui/checkbox"
// import {
//     Filter,
//     ChevronDown,
//     DollarSign,
//     Users,
//     Tag,
//     Package,
//     Palette,
//     Ruler,
//     X,
// } from "lucide-react"

// type FilterProductsProps = {
//     setQueryParams: (name: string, value: string) => void
//     searchParams: URLSearchParams
// }

// const categories = ["fashion", "accessories", "gifts"]
// const brands = ["Store 1", "Store 2", "Store 3"]
// const genders = ["men", "women", "unisex"]

// const FilterProducts = ({ setQueryParams, searchParams }: FilterProductsProps) => {
//     const [open, setOpen] = useState(false)

//     const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
//         setQueryParams(name, checked ? value : "")
//     }

//     const clearAllFilters = () => {
//         const keysToClear = ["category", "brand", "gender", "available"]
//         keysToClear.forEach((key) => {
//             setQueryParams(key, "")
//         })
//     }


//     const hasActiveFilters =
//         searchParams.get("category") ||
//         searchParams.get("brand") ||
//         searchParams.get("gender") ||
//         searchParams.get("available")

//     return (
//         <>
//             {/* 🔘 Desktop Dropdowns */}
//             <div className="hidden md:flex gap-4 flex-wrap items-center">
//                 {/* Category */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="border-gray-300 bg-transparent relative">
//                             <Tag className="w-4 h-4 mr-2" />
//                             Categories
//                             <ChevronDown className="w-4 h-4 ml-2" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
//                         <DropdownMenuLabel>Select Category</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {categories.map((cat) => (
//                             <div key={cat} className="flex items-center space-x-2 px-2 py-1.5">
//                                 <Checkbox
//                                     id={`cat-${cat}`}
//                                     checked={searchParams.get("category") === cat}
//                                     onCheckedChange={(checked) =>
//                                         handleCheckboxChange("category", cat, !!checked)
//                                     }
//                                 />
//                                 <label htmlFor={`cat-${cat}`} className="text-sm capitalize">
//                                     {cat}
//                                 </label>
//                             </div>
//                         ))}
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Brand */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="border-gray-300 bg-transparent relative">
//                             <Package className="w-4 h-4 mr-2" />
//                             Brands
//                             <ChevronDown className="w-4 h-4 ml-2" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
//                         <DropdownMenuLabel>Select Brand</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {brands.map((brand) => (
//                             <div key={brand} className="flex items-center space-x-2 px-2 py-1.5">
//                                 <Checkbox
//                                     id={`brand-${brand}`}
//                                     checked={searchParams.get("brand") === brand}
//                                     onCheckedChange={(checked) =>
//                                         handleCheckboxChange("brand", brand, !!checked)
//                                     }
//                                 />
//                                 <label htmlFor={`brand-${brand}`} className="text-sm capitalize">
//                                     {brand}
//                                 </label>
//                             </div>
//                         ))}
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Gender */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="border-gray-300 bg-transparent relative">
//                             <Users className="w-4 h-4 mr-2" />
//                             Gender
//                             <ChevronDown className="w-4 h-4 ml-2" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-md shadow-lg" align="start">
//                         <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {genders.map((g) => (
//                             <div key={g} className="flex items-center space-x-2 px-2 py-1.5">
//                                 <Checkbox
//                                     id={`gender-${g}`}
//                                     checked={searchParams.get("gender") === g}
//                                     onCheckedChange={(checked) =>
//                                         handleCheckboxChange("gender", g, !!checked)
//                                     }
//                                 />
//                                 <label htmlFor={`gender-${g}`} className="text-sm capitalize">
//                                     {g}
//                                 </label>
//                             </div>
//                         ))}
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Clear Filters */}
//                 <Button
//                     onClick={clearAllFilters}
//                     variant="ghost"
//                     className="text-sm text-gray-600 underline underline-offset-4 hover:text-black px-2"
//                 >
//                     Clear Filters
//                 </Button>
//             </div>

//             {/* 📱 Mobile Drawer */}
//             <div className="md:hidden mt-4 w-full">
//                 <Drawer open={open} onOpenChange={setOpen}>
//                     <DrawerTrigger asChild>
//                         <Button variant="outline" className="w-40">Filters</Button>
//                     </DrawerTrigger>

//                     <DrawerContent className="p-4 gap-6 mb-6 bg-white">
//                         <div className="flex items-center justify-between">
//                             <h3 className="text-xl font-semibold">Filter Products</h3>
//                             {hasActiveFilters && (
//                                 <button onClick={clearAllFilters} className="text-sm text-gray-600 hover:text-black flex items-center">
//                                     <X className="w-4 h-4 mr-1" />
//                                     Clear
//                                 </button>
//                             )}
//                         </div>

//                         {/* Category */}
//                         <div>
//                             <p className="text-lg font-medium mb-2">Category</p>
//                             {categories.map((cat) => (
//                                 <div key={cat} className="flex items-center space-x-2 mb-1">
//                                     <Checkbox
//                                         id={`cat-${cat}`}
//                                         checked={searchParams.get("category") === cat}
//                                         onCheckedChange={(checked) =>
//                                             handleCheckboxChange("category", cat, !!checked)
//                                         }
//                                     />
//                                     <label htmlFor={`cat-${cat}`} className="text-base capitalize">
//                                         {cat}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Brand */}
//                         <div>
//                             <p className="text-lg font-medium mb-2">Brand</p>
//                             {brands.map((brand) => (
//                                 <div key={brand} className="flex items-center space-x-2 mb-1">
//                                     <Checkbox
//                                         id={`brand-${brand}`}
//                                         checked={searchParams.get("brand") === brand}
//                                         onCheckedChange={(checked) =>
//                                             handleCheckboxChange("brand", brand, !!checked)
//                                         }
//                                     />
//                                     <label htmlFor={`brand-${brand}`} className="text-base capitalize">
//                                         {brand}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Gender */}
//                         <div>
//                             <p className="text-lg font-medium mb-2">Gender</p>
//                             {genders.map((g) => (
//                                 <div key={g} className="flex items-center space-x-2 mb-1">
//                                     <Checkbox
//                                         id={`gender-${g}`}
//                                         checked={searchParams.get("gender") === g}
//                                         onCheckedChange={(checked) =>
//                                             handleCheckboxChange("gender", g, !!checked)
//                                         }
//                                     />
//                                     <label htmlFor={`gender-${g}`} className="text-base capitalize">
//                                         {g}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Availability */}
//                         <div>
//                             <p className="text-lg font-medium mb-2">Availability</p>
//                             <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                     id="available"
//                                     checked={searchParams.get("available") === "true"}
//                                     onCheckedChange={(checked) =>
//                                         handleCheckboxChange("available", "true", !!checked)
//                                     }
//                                 />
//                                 <label htmlFor="available" className="text-base">In Stock Only</label>
//                             </div>
//                         </div>

//                         <DrawerClose asChild>
//                             <Button variant="secondary" className="text-base w-full mt-4">Apply Filters</Button>
//                         </DrawerClose>
//                     </DrawerContent>
//                 </Drawer>
//             </div>
//         </>
//     )
// }

// export default FilterProducts