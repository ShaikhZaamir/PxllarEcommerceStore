"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "components/ui/select"

export type SortOptions =
  | "created_at"
  | "price_asc"
  | "price_desc"
  | "popularity"
  | "name"
  | "trending"   

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions: { value: SortOptions; label: string }[] = [
  { value: "trending", label: "Trending" },       // default label first
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "created_at", label: "Newest First" },
  { value: "popularity", label: "Most Popular" },
  { value: "name", label: "Name A-Z" },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div data-testid={dataTestId} className="w-40">
      <Select value={sortBy} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent
          className="bg-white border border-gray-200 rounded-md shadow-lg w-56">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortProducts
