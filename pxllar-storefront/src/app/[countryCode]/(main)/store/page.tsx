import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category?: string
    collection?: string
  }>
  params: Promise<{ countryCode: string }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParamsObj = await props.searchParams
  const { sortBy, page, category, collection } = searchParamsObj

  // ✅ Convert to URLSearchParams for client components
  const urlSearchParams = new URLSearchParams()
  if (category) urlSearchParams.set("category", category)
  if (collection) urlSearchParams.set("collection", collection)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      category={category}
      collectionId={collection}
      countryCode={params.countryCode}
    />
  )
}








// import { Metadata } from "next"

// import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
// import StoreTemplate from "@modules/store/templates"

// export const metadata: Metadata = {
//   title: "Store",
//   description: "Explore all of our products.",
// }

// type Params = {
//   searchParams: Promise<{
//     sortBy?: SortOptions
//     page?: string
//   }>
//   params: Promise<{
//     countryCode: string
//   }>
// }

// export default async function StorePage(props: Params) {
//   const params = await props.params;
//   const searchParams = await props.searchParams;
//   const { sortBy, page } = searchParams

//   return (
//     <StoreTemplate
//       sortBy={sortBy}
//       page={page}
//       countryCode={params.countryCode}
//     />
//   )
// }
