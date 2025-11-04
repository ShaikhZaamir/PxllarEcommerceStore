"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { Share2, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // Inventory cache: variantId -> quantity
  const [inventoryCache, setInventoryCache] = useState<Record<string, number>>({})
  const [isLoadingInventory, setIsLoadingInventory] = useState(false)

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return undefined
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Fetch live inventory for selected variant from backend API
  useEffect(() => {
    async function fetchInventory() {
      if (!selectedVariant) return
      const variantId = selectedVariant.id
      if (inventoryCache[variantId] !== undefined) return // already cached

      setIsLoadingInventory(true)
      try {
        const res = await fetch(`/api/inventory/${variantId}`)
        if (!res.ok) {
          console.warn(`Inventory fetch failed for variant ${variantId}, using local quantity`)
          setInventoryCache((prev) => ({
            ...prev,
            [variantId]: selectedVariant.inventory_quantity ?? 0,
          }))
          return
        }
        const data = await res.json()
        setInventoryCache((prev) => ({
          ...prev,
          [variantId]: data.inventory_quantity,
        }))
      } catch (error) {
        console.warn("Error fetching inventory, using local quantity:", error)
        setInventoryCache((prev) => ({
          ...prev,
          [variantId]: selectedVariant.inventory_quantity ?? 0,
        }))
      } finally {
        setIsLoadingInventory(false)
      }
    }

    fetchInventory()
  }, [selectedVariant, inventoryCache])


  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Determine if in stock using backend inventory if available, else fallback to local
  const inStock = useMemo(() => {
    if (!selectedVariant) return false

    const backendQty = inventoryCache[selectedVariant.id]

    if (backendQty !== undefined) {
      if (!selectedVariant.manage_inventory) return true
      if (selectedVariant.allow_backorder) return true
      return backendQty > 0
    }

    if (!selectedVariant.manage_inventory) return true
    if (selectedVariant.allow_backorder) return true
    if ((selectedVariant.inventory_quantity ?? 0) > 0) return true

    return false
  }, [selectedVariant, inventoryCache])

  // New: Check if any variant is in stock to show initial stock status
  const anyVariantInStock = useMemo(() => {
    if (!product.variants) return false

    return product.variants.some((variant) => {
      const qty = inventoryCache[variant.id] ?? variant.inventory_quantity ?? 0
      if (!variant.manage_inventory) return true
      if (variant.allow_backorder) return true
      return qty > 0
    })
  }, [product.variants, inventoryCache])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)
    try {
      // call the server action (keeps working as before)
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })

      toast(
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg">{product.title}</span>
          <span className="text-sm">Added to your cart successfully!</span>
        </div>,
        {
          duration: 7000,
          style: {
            background: "#d1fae5",             // soft light green
            color: "#065f46",                  // dark green for text
            fontSize: "1rem",
            fontFamily: "'Inter', sans-serif", // modern, clean font
            fontWeight: 500,
            padding: "1.25rem 1.5rem",
            borderRadius: "1rem",              // rounded pill look
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)", // subtle shadow
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          },
        }
      )


      // notify listeners (CartButton) to update count
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"))
      }
    } catch (err) {
      console.error("Add to cart failed:", err)

      // Optional: show error toast
      toast(
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg">Could not add to cart</span>
          <span className="text-sm">
            Something went wrong. Please contact support to place your order.
          </span>
        </div>,
        {
          duration: 7000,
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            fontSize: "1rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            padding: "1.25rem 1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          },
        }
      )

    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <div className="flex items-baseline gap-3 mt-2">
          <Button
            size="lg"
            className="flex-1 max-w-[70%] p-2"
            onClick={handleAddToCart}
            disabled={!inStock || !!disabled || isAdding || isLoadingInventory}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>

          <Button variant="transparent" className="p-2" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mt-1">
          <div
            className={`w-2 h-2 rounded-full ${selectedVariant
              ? inStock
                ? "bg-green-500"
                : "bg-red-500"
              : anyVariantInStock
                ? "bg-green-500"
                : "bg-red-500"
              }`}
          />
          <span className="text-sm">
            {selectedVariant
              ? inStock
                ? `In Stock (${inventoryCache[selectedVariant.id] ??
                selectedVariant.inventory_quantity ??
                0
                } available)`
                : "Out of Stock"
              : anyVariantInStock
                ? "In Stock"
                : "Out of Stock"}
          </span>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
