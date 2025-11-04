import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  const calculated = price.calculated_amount || 0
  const original = price.original_amount || 0

  const isDiscounted = original > calculated

  console.log("🔍 Debug price object:", price)

  return (
    <>
      {isDiscounted && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          ₹{(original / 100).toFixed(2)}
        </Text>
      )}
      <Text
        className={clx("text-ui-fg-muted", {
          "text-ui-fg-interactive": isDiscounted,
        })}
        data-testid="price"
      >
        ₹{(calculated / 100).toFixed(2)}
      </Text>
    </>
  )
}
