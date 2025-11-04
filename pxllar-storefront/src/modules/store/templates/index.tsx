import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import BackButton from "components/back-button"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  category,
  collectionId,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  category?: string
  collectionId?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "trending"

  const formatTitle = (text?: string) => {
    if (!text) return null
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  const categoryTitle = formatTitle(category)
  const collectionTitle = formatTitle(collectionId)

  const titleParts = []
  if (categoryTitle) titleParts.push(categoryTitle)
  if (collectionTitle) titleParts.push(collectionTitle)

  const pageTitle =
    titleParts.length > 0 ? titleParts.join(" + ") : "All Products"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start px-2 mb-5"
      data-testid="category-container"
    >
      <div className="w-full">
        {/* ✅ Back Button (Client Component) */}

        <div className="mb-2 text-xl-semi">
        {/* <BackButton /> */}
          <h1 data-testid="store-page-title">{pageTitle}</h1>
        </div>

        <RefinementList sortBy={sort} />

        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categoryId={category}
            collectionId={collectionId}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate





// import { Suspense } from "react"

// import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
// import RefinementList from "@modules/store/components/refinement-list"
// import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// import PaginatedProducts from "./paginated-products"

// const StoreTemplate = ({
//   sortBy,
//   page,
//   countryCode,
//   category,
//   collectionId,
// }: {
//   sortBy?: SortOptions
//   page?: string
//   countryCode: string
//   category?: string
//   collectionId?: string
// }) => {
//   const pageNumber = page ? parseInt(page) : 1
//   const sort = sortBy || "trending"

//   // ✅ Capitalize + format (replace hyphens with spaces)
//   const formatTitle = (text?: string) => {
//     if (!text) return null
//     return text
//       .replace(/-/g, " ")
//       .replace(/\b\w/g, (c) => c.toUpperCase())
//   }

//   const categoryTitle = formatTitle(category)
//   const collectionTitle = formatTitle(collectionId)

//   // ✅ Combine both if present
//   const titleParts = []
//   if (categoryTitle) titleParts.push(categoryTitle)
//   if (collectionTitle) titleParts.push(collectionTitle)

//   const pageTitle = titleParts.length > 0 ? titleParts.join(" + ") : "All Products"

//   return (
//     <div
//       className="flex flex-col small:flex-row small:items-start px-2 mb-5"
//       data-testid="category-container"
//     >
//       <div className="w-full">
//         <div className="mb-2 text-xl-semi">
//           <h1 data-testid="store-page-title">{pageTitle}</h1>
//         </div>

//         <RefinementList sortBy={sort} />

//         <Suspense fallback={<SkeletonProductGrid />}>
//           <PaginatedProducts
//             sortBy={sort}
//             page={pageNumber}
//             countryCode={countryCode}
//             categoryId={category}
//             collectionId={collectionId}
//           />
//         </Suspense>
//       </div>
//     </div>
//   )
// }

// export default StoreTemplate