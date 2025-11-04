import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { CategoryGrid } from "@modules/home/components/category-grid"
import FeaturedProducts from "@modules/home/components/featured-products"
import { Newsletter } from "@modules/home/components/newsletter"
import NewArrivalsProducts from "@modules/home/components/arrivals-grid"

export const metadata: Metadata = {
  title: "Pxllar Store | Home",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <NewArrivalsProducts />
      <Newsletter />

      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
        </ul>
      </div> */}
    </>
  )
}
