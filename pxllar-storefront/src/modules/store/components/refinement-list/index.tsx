"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import FilterProducts from "./filter-products"
// import { ProductSearch } from "./search-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({ sortBy = "trending", "data-testid": dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-wrap justify-between items-baseline w-full gap-4 pb-3">
      <div className="min-w-[160px] sm:min-w-[200px]">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>

      {/* ✅ Desktop Search */}
      {/* <div className="hidden md:flex grow items-center">
        <ProductSearch
          products={[]} // Replace with actual product list
          onSearchResults={(results: any[]) => {
            console.log("Search results:", results)
          }}
        />
      </div> */}

      <div className="min-w-[160px] sm:min-w-[200px]">
        <FilterProducts setQueryParams={setQueryParams} searchParams={searchParams} />
      </div>
    </div>
  )
}

export default RefinementList
