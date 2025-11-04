import Medusa from "@medusajs/medusa-js"

// Initialize Medusa client
const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
})

// Types
export interface Product {
  id: string
  title: string
  description: string
  handle: string
  thumbnail: string
  images: string[]
  variants: ProductVariant[]
  options: ProductOption[]
  tags: string[]
  collection_id?: string
  type?: string
  status: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ProductVariant {
  id: string
  title: string
  product_id: string
  sku?: string
  barcode?: string
  ean?: string
  upc?: string
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean
  hs_code?: string
  origin_country?: string
  mid_code?: string
  material?: string
  weight?: number
  length?: number
  height?: number
  width?: number
  options: VariantOption[]
  prices: Price[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ProductOption {
  id: string
  title: string
  values: OptionValue[]
}

export interface OptionValue {
  id: string
  value: string
  option_id: string
}

export interface VariantOption {
  option_id: string
  value: string
}

export interface Price {
  id: string
  currency_code: string
  amount: number
  variant_id: string
  region_id?: string
}

export interface Cart {
  id: string
  email?: string
  billing_address?: Address
  shipping_address?: Address
  items: LineItem[]
  region: Region
  discounts: Discount[]
  gift_cards: GiftCard[]
  customer_id?: string
  payment_session?: PaymentSession
  payment_sessions: PaymentSession[]
  payment_id?: string
  shipping_methods: ShippingMethod[]
  type: string
  completed_at?: string
  payment_authorized_at?: string
  idempotency_key?: string
  context?: Record<string, any>
  sales_channel_id?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
  subtotal: number
  tax_total: number
  shipping_total: number
  discount_total: number
  gift_card_total: number
  total: number
}

export interface LineItem {
  id: string
  cart_id: string
  order_id?: string
  swap_id?: string
  claim_order_id?: string
  title: string
  description?: string
  thumbnail?: string
  is_return: boolean
  is_giftcard: boolean
  should_merge: boolean
  allow_discounts: boolean
  has_shipping: boolean
  unit_price: number
  variant_id?: string
  variant: ProductVariant
  quantity: number
  fulfilled_quantity?: number
  returned_quantity?: number
  shipped_quantity?: number
  refundable_amount?: number
  subtotal: number
  tax_total: number
  total: number
  original_total: number
  original_tax_total: number
  discount_total: number
  gift_card_total: number
  includes_tax: boolean
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Address {
  id?: string
  customer_id?: string
  company?: string
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  city?: string
  country_code?: string
  province?: string
  postal_code?: string
  phone?: string
  created_at?: string
  updated_at?: string
  metadata?: Record<string, any>
}

export interface Region {
  id: string
  name: string
  currency_code: string
  tax_rate: number
  tax_code?: string
  gift_cards_taxable: boolean
  automatic_taxes: boolean
  countries: Country[]
  payment_providers: PaymentProvider[]
  fulfillment_providers: FulfillmentProvider[]
  includes_tax: boolean
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Country {
  id: string
  iso_2: string
  iso_3: string
  num_code: number
  name: string
  display_name: string
  region_id?: string
}

export interface PaymentProvider {
  id: string
  is_installed: boolean
}

export interface FulfillmentProvider {
  id: string
  is_installed: boolean
}

export interface Discount {
  id: string
  code: string
  is_dynamic: boolean
  rule: DiscountRule
  is_disabled: boolean
  parent_discount_id?: string
  starts_at: string
  ends_at?: string
  valid_duration?: string
  regions: Region[]
  usage_limit?: number
  usage_count: number
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface DiscountRule {
  id: string
  description?: string
  type: string
  value: number
  allocation?: string
  conditions: DiscountCondition[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface DiscountCondition {
  id: string
  type: string
  operator: string
  discount_rule_id: string
  products?: Product[]
  product_types?: ProductType[]
  product_tags?: ProductTag[]
  product_collections?: ProductCollection[]
  customer_groups?: CustomerGroup[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ProductType {
  id: string
  value: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ProductTag {
  id: string
  value: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ProductCollection {
  id: string
  title: string
  handle: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface CustomerGroup {
  id: string
  name: string
  customers?: Customer[]
  price_lists?: PriceList[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Customer {
  id: string
  email: string
  first_name?: string
  last_name?: string
  billing_address_id?: string
  billing_address?: Address
  shipping_addresses?: Address[]
  phone?: string
  has_account: boolean
  orders?: Order[]
  groups?: CustomerGroup[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface PriceList {
  id: string
  name: string
  description: string
  type: string
  status: string
  starts_at?: string
  ends_at?: string
  customer_groups?: CustomerGroup[]
  prices: MoneyAmount[]
  includes_tax: boolean
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface MoneyAmount {
  id: string
  currency_code: string
  amount: number
  price_list_id?: string
  variant_id?: string
  region_id?: string
  created_at: string
  updated_at: string
}

export interface GiftCard {
  id: string
  code: string
  value: number
  balance: number
  region_id: string
  region: Region
  order_id?: string
  order?: Order
  is_disabled: boolean
  ends_at?: string
  tax_rate?: number
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface PaymentSession {
  id: string
  cart_id?: string
  provider_id: string
  is_selected?: boolean
  is_initiated: boolean
  status: string
  data: Record<string, any>
  amount: number
  payment_authorized_at?: string
  idempotency_key?: string
  created_at: string
  updated_at: string
}

export interface ShippingMethod {
  id: string
  shipping_option_id: string
  order_id?: string
  cart_id?: string
  swap_id?: string
  return_id?: string
  claim_order_id?: string
  shipping_option: ShippingOption
  tax_lines: ShippingMethodTaxLine[]
  price: number
  data: Record<string, any>
  includes_tax: boolean
  subtotal: number
  total: number
  tax_total: number
}

export interface ShippingOption {
  id: string
  name: string
  region_id: string
  profile_id: string
  provider_id: string
  price_type: string
  amount?: number
  is_return: boolean
  admin_only: boolean
  requirements: ShippingOptionRequirement[]
  data: Record<string, any>
  includes_tax: boolean
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ShippingOptionRequirement {
  id: string
  shipping_option_id: string
  type: string
  amount: number
}

export interface ShippingMethodTaxLine {
  id: string
  rate: number
  name: string
  code?: string
  shipping_method_id: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Order {
  id: string
  status: string
  fulfillment_status: string
  payment_status: string
  display_id: number
  cart_id?: string
  cart?: Cart
  customer_id: string
  customer: Customer
  email: string
  billing_address_id?: string
  billing_address?: Address
  shipping_address_id?: string
  shipping_address?: Address
  region_id: string
  region: Region
  currency_code: string
  tax_rate?: number
  discounts: Discount[]
  gift_cards: GiftCard[]
  shipping_methods: ShippingMethod[]
  payments: Payment[]
  fulfillments: Fulfillment[]
  returns: Return[]
  claims: ClaimOrder[]
  refunds: Refund[]
  swaps: Swap[]
  draft_order_id?: string
  draft_order?: DraftOrder
  items: LineItem[]
  edits: OrderEdit[]
  gift_card_transactions: GiftCardTransaction[]
  canceled_at?: string
  no_notification?: boolean
  idempotency_key?: string
  external_id?: string
  sales_channel_id?: string
  sales_channel?: SalesChannel
  shipping_total: number
  discount_total: number
  tax_total: number
  refunded_total: number
  total: number
  subtotal: number
  paid_total: number
  refundable_amount: number
  gift_card_total: number
  gift_card_tax_total: number
  returnable_items?: LineItem[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Payment {
  id: string
  swap_id?: string
  cart_id?: string
  order_id?: string
  amount: number
  currency_code: string
  amount_refunded: number
  provider_id: string
  data: Record<string, any>
  captured_at?: string
  canceled_at?: string
  idempotency_key?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Fulfillment {
  id: string
  claim_order_id?: string
  swap_id?: string
  order_id?: string
  provider_id: string
  location_id?: string
  shipped_at?: string
  canceled_at?: string
  data: Record<string, any>
  tracking_links: TrackingLink[]
  items: FulfillmentItem[]
  no_notification?: boolean
  idempotency_key?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface TrackingLink {
  id: string
  url?: string
  tracking_number: string
  fulfillment_id: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface FulfillmentItem {
  fulfillment_id: string
  item_id: string
  quantity: number
}

export interface Return {
  id: string
  status: string
  items: ReturnItem[]
  swap_id?: string
  claim_order_id?: string
  order_id?: string
  shipping_method?: ShippingMethod
  shipping_data?: Record<string, any>
  location_id?: string
  refund_amount: number
  no_notification?: boolean
  idempotency_key?: string
  received_at?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ReturnItem {
  return_id: string
  item_id: string
  quantity: number
  is_requested: boolean
  requested_quantity?: number
  received_quantity?: number
  reason_id?: string
  reason?: ReturnReason
  note?: string
  metadata?: Record<string, any>
}

export interface ReturnReason {
  id: string
  value: string
  label: string
  description?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ClaimOrder {
  id: string
  payment_status: string
  fulfillment_status: string
  type: string
  order_id: string
  order?: Order
  return_order?: Return
  shipping_address_id?: string
  shipping_address?: Address
  shipping_methods: ShippingMethod[]
  fulfillments: Fulfillment[]
  claim_items: ClaimItem[]
  additional_items: LineItem[]
  no_notification?: boolean
  canceled_at?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ClaimItem {
  id: string
  images: ClaimImage[]
  claim_order_id: string
  item_id: string
  item: LineItem
  variant_id: string
  variant: ProductVariant
  reason: string
  note?: string
  quantity: number
  tags: ClaimTag[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ClaimImage {
  id: string
  claim_item_id: string
  url: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface ClaimTag {
  id: string
  value: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Refund {
  id: string
  order_id?: string
  amount: number
  note?: string
  reason: string
  payment_id?: string
  idempotency_key?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Swap {
  id: string
  fulfillment_status: string
  payment_status: string
  order_id: string
  order?: Order
  additional_items: LineItem[]
  return_order?: Return
  fulfillments: Fulfillment[]
  payment?: Payment
  difference_due?: number
  shipping_address_id?: string
  shipping_address?: Address
  shipping_methods: ShippingMethod[]
  cart_id?: string
  cart?: Cart
  confirmed_at?: string
  canceled_at?: string
  no_notification?: boolean
  allow_backorder: boolean
  idempotency_key?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface DraftOrder {
  id: string
  status: string
  display_id: number
  cart_id?: string
  cart?: Cart
  order_id?: string
  order?: Order
  canceled_at?: string
  completed_at?: string
  no_notification_order?: boolean
  idempotency_key?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface OrderEdit {
  id: string
  order_id: string
  order?: Order
  changes: OrderItemChange[]
  internal_note?: string
  created_by: string
  requested_by?: string
  requested_at?: string
  confirmed_by?: string
  confirmed_at?: string
  declined_by?: string
  declined_reason?: string
  declined_at?: string
  canceled_by?: string
  canceled_at?: string
  payment_collection_id?: string
  created_at: string
  updated_at: string
}

export interface OrderItemChange {
  id: string
  order_edit_id: string
  order_edit?: OrderEdit
  original_line_item_id?: string
  original_line_item?: LineItem
  line_item_id?: string
  line_item?: LineItem
  type: string
  created_at: string
  updated_at: string
}

export interface GiftCardTransaction {
  id: string
  gift_card_id: string
  gift_card?: GiftCard
  order_id?: string
  order?: Order
  amount: number
  created_at: string
  is_taxable?: boolean
  tax_rate?: number
}

export interface SalesChannel {
  id: string
  name: string
  description?: string
  is_disabled: boolean
  locations?: StockLocation[]
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface StockLocation {
  id: string
  name: string
  address_id?: string
  address?: Address
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "prod_01HXYZ123",
    title: "Handwoven Silk Saree",
    description:
      "Exquisite handwoven silk saree with traditional Banarasi patterns. Perfect for weddings and special occasions. Made by skilled artisans using time-honored techniques.",
    handle: "handwoven-silk-saree",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      {
        id: "variant_01HXYZ123_RED",
        title: "Red / One Size",
        product_id: "prod_01HXYZ123",
        sku: "HSS-RED-OS",
        inventory_quantity: 5,
        allow_backorder: false,
        manage_inventory: true,
        options: [
          { option_id: "opt_color", value: "Red" },
          { option_id: "opt_size", value: "One Size" },
        ],
        prices: [
          {
            id: "price_01HXYZ123_RED",
            currency_code: "inr",
            amount: 1299900, // ₹12,999.00
            variant_id: "variant_01HXYZ123_RED",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "variant_01HXYZ123_BLUE",
        title: "Blue / One Size",
        product_id: "prod_01HXYZ123",
        sku: "HSS-BLUE-OS",
        inventory_quantity: 3,
        allow_backorder: false,
        manage_inventory: true,
        options: [
          { option_id: "opt_color", value: "Blue" },
          { option_id: "opt_size", value: "One Size" },
        ],
        prices: [
          {
            id: "price_01HXYZ123_BLUE",
            currency_code: "inr",
            amount: 1299900, // ₹12,999.00
            variant_id: "variant_01HXYZ123_BLUE",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
    options: [
      {
        id: "opt_color",
        title: "Color",
        values: [
          { id: "val_red", value: "Red", option_id: "opt_color" },
          { id: "val_blue", value: "Blue", option_id: "opt_color" },
        ],
      },
      {
        id: "opt_size",
        title: "Size",
        values: [{ id: "val_onesize", value: "One Size", option_id: "opt_size" }],
      },
    ],
    tags: ["traditional", "handwoven", "silk", "wedding", "festival"],
    collection_id: "coll_traditional_wear",
    type: "clothing",
    status: "published",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    metadata: {
      material: "Pure Silk",
      origin: "Varanasi, India",
      care_instructions: "Dry clean only",
    },
  },
  {
    id: "prod_01HXYZ124",
    title: "Brass Decorative Diya Set",
    description:
      "Beautiful set of handcrafted brass diyas perfect for festivals and special occasions. Each diya is carefully crafted by skilled artisans with intricate designs.",
    handle: "brass-decorative-diya-set",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      {
        id: "variant_01HXYZ124_SET5",
        title: "Set of 5",
        product_id: "prod_01HXYZ124",
        sku: "BDS-SET5",
        inventory_quantity: 20,
        allow_backorder: true,
        manage_inventory: true,
        options: [{ option_id: "opt_quantity", value: "Set of 5" }],
        prices: [
          {
            id: "price_01HXYZ124_SET5",
            currency_code: "inr",
            amount: 89900, // ₹899.00
            variant_id: "variant_01HXYZ124_SET5",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "variant_01HXYZ124_SET10",
        title: "Set of 10",
        product_id: "prod_01HXYZ124",
        sku: "BDS-SET10",
        inventory_quantity: 15,
        allow_backorder: true,
        manage_inventory: true,
        options: [{ option_id: "opt_quantity", value: "Set of 10" }],
        prices: [
          {
            id: "price_01HXYZ124_SET10",
            currency_code: "inr",
            amount: 159900, // ₹1,599.00
            variant_id: "variant_01HXYZ124_SET10",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
    options: [
      {
        id: "opt_quantity",
        title: "Quantity",
        values: [
          { id: "val_set5", value: "Set of 5", option_id: "opt_quantity" },
          { id: "val_set10", value: "Set of 10", option_id: "opt_quantity" },
        ],
      },
    ],
    tags: ["brass", "diya", "festival", "diwali", "handcrafted", "traditional"],
    collection_id: "coll_home_decor",
    type: "home-decor",
    status: "published",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    metadata: {
      material: "Brass",
      origin: "Moradabad, India",
      care_instructions: "Clean with soft cloth, avoid harsh chemicals",
    },
  },
  {
    id: "prod_01HXYZ125",
    title: "Handmade Leather Wallet",
    description:
      "Premium quality handmade leather wallet crafted from genuine leather. Features multiple card slots, cash compartments, and a coin pocket. Perfect for daily use.",
    handle: "handmade-leather-wallet",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      {
        id: "variant_01HXYZ125_BROWN",
        title: "Brown",
        product_id: "prod_01HXYZ125",
        sku: "HLW-BROWN",
        inventory_quantity: 12,
        allow_backorder: false,
        manage_inventory: true,
        options: [{ option_id: "opt_color", value: "Brown" }],
        prices: [
          {
            id: "price_01HXYZ125_BROWN",
            currency_code: "inr",
            amount: 199900, // ₹1,999.00
            variant_id: "variant_01HXYZ125_BROWN",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "variant_01HXYZ125_BLACK",
        title: "Black",
        product_id: "prod_01HXYZ125",
        sku: "HLW-BLACK",
        inventory_quantity: 8,
        allow_backorder: false,
        manage_inventory: true,
        options: [{ option_id: "opt_color", value: "Black" }],
        prices: [
          {
            id: "price_01HXYZ125_BLACK",
            currency_code: "inr",
            amount: 199900, // ₹1,999.00
            variant_id: "variant_01HXYZ125_BLACK",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
    options: [
      {
        id: "opt_color",
        title: "Color",
        values: [
          { id: "val_brown", value: "Brown", option_id: "opt_color" },
          { id: "val_black", value: "Black", option_id: "opt_color" },
        ],
      },
    ],
    tags: ["leather", "wallet", "handmade", "accessories", "premium"],
    collection_id: "coll_accessories",
    type: "accessories",
    status: "published",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    metadata: {
      material: "Genuine Leather",
      origin: "Kanpur, India",
      care_instructions: "Keep away from water, use leather conditioner occasionally",
    },
  },
  {
    id: "prod_01HXYZ126",
    title: "Handcrafted Wooden Jewelry Box",
    description:
      "Elegant handcrafted wooden jewelry box with intricate carvings and velvet interior. Perfect for storing precious jewelry and accessories. Made from premium rosewood.",
    handle: "handcrafted-wooden-jewelry-box",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      {
        id: "variant_01HXYZ126_MEDIUM",
        title: "Medium",
        product_id: "prod_01HXYZ126",
        sku: "WJB-MEDIUM",
        inventory_quantity: 6,
        allow_backorder: false,
        manage_inventory: true,
        options: [{ option_id: "opt_size", value: "Medium" }],
        prices: [
          {
            id: "price_01HXYZ126_MEDIUM",
            currency_code: "inr",
            amount: 249900, // ₹2,499.00
            variant_id: "variant_01HXYZ126_MEDIUM",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "variant_01HXYZ126_LARGE",
        title: "Large",
        product_id: "prod_01HXYZ126",
        sku: "WJB-LARGE",
        inventory_quantity: 4,
        allow_backorder: false,
        manage_inventory: true,
        options: [{ option_id: "opt_size", value: "Large" }],
        prices: [
          {
            id: "price_01HXYZ126_LARGE",
            currency_code: "inr",
            amount: 349900, // ₹3,499.00
            variant_id: "variant_01HXYZ126_LARGE",
          },
        ],
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
    options: [
      {
        id: "opt_size",
        title: "Size",
        values: [
          { id: "val_medium", value: "Medium", option_id: "opt_size" },
          { id: "val_large", value: "Large", option_id: "opt_size" },
        ],
      },
    ],
    tags: ["wooden", "jewelry", "box", "handcrafted", "storage", "rosewood"],
    collection_id: "coll_home_decor",
    type: "home-decor",
    status: "published",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    metadata: {
      material: "Rosewood",
      origin: "Saharanpur, India",
      care_instructions: "Dust with soft cloth, avoid direct sunlight",
    },
  },
]

// API Functions
export async function getProducts(limit = 20, offset = 0): Promise<{ products: Product[]; count: number }> {
  try {
    const response = await medusa.products.list({ limit, offset })
    return {
      products: response.products.map(transformMedusaProduct),
      count: response.count,
    }
  } catch (error) {
    console.warn("Failed to fetch products from Medusa, using mock data:", error)
    return {
      products: mockProducts.slice(offset, offset + limit),
      count: mockProducts.length,
    }
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await medusa.products.retrieve(id)
    return transformMedusaProduct(response.product)
  } catch (error) {
    return mockProducts.find((p) => p.id === id) || null
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const response = await medusa.products.list({ handle })
    if (response.products.length > 0) {
      return transformMedusaProduct(response.products[0])
    }
    return null
  } catch (error) {
    console.warn(`Failed to fetch product by handle ${handle} from Medusa, using mock data:`, error)
    return mockProducts.find((p) => p.handle === handle) || null
  }
}

export async function getRecommendedProducts(productId: string, limit = 4): Promise<Product[]> {
  try {
    // In a real implementation, this would use Medusa's recommendation engine
    // For now, we'll return other products from the same collection
    const product = await getProduct(productId)
    if (!product) return []

    const response = await medusa.products.list({
      collection_id: [product.collection_id!],
      limit: limit + 1,
    })

    return response.products
      .filter((p) => p.id !== productId)
      .slice(0, limit)
      .map(transformMedusaProduct)
  } catch (error) {
    console.warn(`Failed to fetch recommended products for ${productId}, using mock data:`, error)
    // Return random products excluding the current one
    return mockProducts.filter((p) => p.id !== productId).slice(0, limit)
  }
}

export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  try {
    const response = await medusa.products.search({ q: query, limit })
    return response.hits.map(transformMedusaProduct)
  } catch (error) {
    console.warn(`Failed to search products for "${query}", using mock data:`, error)
    // Simple mock search
    const lowerQuery = query.toLowerCase()
    return mockProducts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
      .slice(0, limit)
  }
}

export async function getCollections(): Promise<ProductCollection[]> {
  try {
    const response = await medusa.collections.list()
    return response.collections
  } catch (error) {
    console.warn("Failed to fetch collections from Medusa, using mock data:", error)
    return [
      {
        id: "coll_traditional_wear",
        title: "Traditional Wear",
        handle: "traditional-wear",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "coll_home_decor",
        title: "Home Decor",
        handle: "home-decor",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "coll_accessories",
        title: "Accessories",
        handle: "accessories",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ]
  }
}

export async function createCart(): Promise<Cart> {
  try {
    const response = await medusa.carts.create()
    return transformMedusaCart(response.cart)
  } catch (error) {
    console.warn("Failed to create cart in Medusa, using mock cart:", error)
    return createMockCart()
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const response = await medusa.carts.retrieve(cartId)
    return transformMedusaCart(response.cart)
  } catch (error) {
    console.warn(`Failed to fetch cart ${cartId} from Medusa:`, error)
    return null
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  try {
    const response = await medusa.carts.lineItems.create(cartId, {
      variant_id: variantId,
      quantity,
    })
    return transformMedusaCart(response.cart)
  } catch (error) {
    console.warn(`Failed to add item to cart ${cartId}:`, error)
    throw error
  }
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  try {
    const response = await medusa.carts.lineItems.update(cartId, lineId, { quantity })
    return transformMedusaCart(response.cart)
  } catch (error) {
    console.warn(`Failed to update cart item ${lineId}:`, error)
    throw error
  }
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  try {
    const response = await medusa.carts.lineItems.delete(cartId, lineId)
    return transformMedusaCart(response.cart)
  } catch (error) {
    console.warn(`Failed to remove item ${lineId} from cart:`, error)
    throw error
  }
}

export async function createOrder(cartId: string): Promise<Order> {
  try {
    const response = await medusa.carts.complete(cartId)
    return transformMedusaOrder(response.data)
  } catch (error) {
    console.warn(`Failed to create order from cart ${cartId}:`, error)
    throw error
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const response = await medusa.orders.retrieve(orderId)
    return transformMedusaOrder(response.order)
  } catch (error) {
    console.warn(`Failed to fetch order ${orderId}:`, error)
    return null
  }
}

// Transform functions
export function transformMedusaProduct(medusaProduct: any): Product {
  return {
    id: medusaProduct.id,
    title: medusaProduct.title,
    description: medusaProduct.description || "",
    handle: medusaProduct.handle,
    thumbnail: medusaProduct.thumbnail || "/placeholder.svg?height=400&width=400",
    images: medusaProduct.images?.map((img: any) => img.url) || [],
    variants:
      medusaProduct.variants?.map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        product_id: variant.product_id,
        sku: variant.sku,
        inventory_quantity: variant.inventory_quantity || 0,
        allow_backorder: variant.allow_backorder || false,
        manage_inventory: variant.manage_inventory || true,
        options: variant.options || [],
        prices:
          variant.prices?.map((price: any) => ({
            id: price.id,
            currency_code: price.currency_code,
            amount: price.amount,
            variant_id: price.variant_id,
            region_id: price.region_id,
          })) || [],
        created_at: variant.created_at,
        updated_at: variant.updated_at,
        metadata: variant.metadata,
      })) || [],
    options:
      medusaProduct.options?.map((option: any) => ({
        id: option.id,
        title: option.title,
        values:
          option.values?.map((value: any) => ({
            id: value.id,
            value: value.value,
            option_id: value.option_id,
          })) || [],
      })) || [],
    tags: medusaProduct.tags?.map((tag: any) => tag.value) || [],
    collection_id: medusaProduct.collection_id,
    type: medusaProduct.type?.value,
    status: medusaProduct.status,
    created_at: medusaProduct.created_at,
    updated_at: medusaProduct.updated_at,
    metadata: medusaProduct.metadata,
  }
}

export function transformMedusaCart(medusaCart: any): Cart {
  return {
    id: medusaCart.id,
    email: medusaCart.email,
    billing_address: medusaCart.billing_address,
    shipping_address: medusaCart.shipping_address,
    items:
      medusaCart.items?.map((item: any) => ({
        id: item.id,
        cart_id: item.cart_id,
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        is_return: item.is_return || false,
        is_giftcard: item.is_giftcard || false,
        should_merge: item.should_merge || true,
        allow_discounts: item.allow_discounts || true,
        has_shipping: item.has_shipping || true,
        unit_price: item.unit_price,
        variant_id: item.variant_id,
        variant: item.variant,
        quantity: item.quantity,
        subtotal: item.subtotal,
        tax_total: item.tax_total || 0,
        total: item.total,
        original_total: item.original_total,
        original_tax_total: item.original_tax_total || 0,
        discount_total: item.discount_total || 0,
        gift_card_total: item.gift_card_total || 0,
        includes_tax: item.includes_tax || false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        metadata: item.metadata,
      })) || [],
    region: medusaCart.region,
    discounts: medusaCart.discounts || [],
    gift_cards: medusaCart.gift_cards || [],
    customer_id: medusaCart.customer_id,
    payment_session: medusaCart.payment_session,
    payment_sessions: medusaCart.payment_sessions || [],
    payment_id: medusaCart.payment_id,
    shipping_methods: medusaCart.shipping_methods || [],
    type: medusaCart.type || "default",
    completed_at: medusaCart.completed_at,
    payment_authorized_at: medusaCart.payment_authorized_at,
    idempotency_key: medusaCart.idempotency_key,
    context: medusaCart.context,
    sales_channel_id: medusaCart.sales_channel_id,
    created_at: medusaCart.created_at,
    updated_at: medusaCart.updated_at,
    metadata: medusaCart.metadata,
    subtotal: medusaCart.subtotal || 0,
    tax_total: medusaCart.tax_total || 0,
    shipping_total: medusaCart.shipping_total || 0,
    discount_total: medusaCart.discount_total || 0,
    gift_card_total: medusaCart.gift_card_total || 0,
    total: medusaCart.total || 0,
  }
}

export function transformMedusaOrder(medusaOrder: any): Order {
  return {
    id: medusaOrder.id,
    status: medusaOrder.status,
    fulfillment_status: medusaOrder.fulfillment_status,
    payment_status: medusaOrder.payment_status,
    display_id: medusaOrder.display_id,
    cart_id: medusaOrder.cart_id,
    cart: medusaOrder.cart,
    customer_id: medusaOrder.customer_id,
    customer: medusaOrder.customer,
    email: medusaOrder.email,
    billing_address_id: medusaOrder.billing_address_id,
    billing_address: medusaOrder.billing_address,
    shipping_address_id: medusaOrder.shipping_address_id,
    shipping_address: medusaOrder.shipping_address,
    region_id: medusaOrder.region_id,
    region: medusaOrder.region,
    currency_code: medusaOrder.currency_code,
    tax_rate: medusaOrder.tax_rate,
    discounts: medusaOrder.discounts || [],
    gift_cards: medusaOrder.gift_cards || [],
    shipping_methods: medusaOrder.shipping_methods || [],
    payments: medusaOrder.payments || [],
    fulfillments: medusaOrder.fulfillments || [],
    returns: medusaOrder.returns || [],
    claims: medusaOrder.claims || [],
    refunds: medusaOrder.refunds || [],
    swaps: medusaOrder.swaps || [],
    draft_order_id: medusaOrder.draft_order_id,
    draft_order: medusaOrder.draft_order,
    items: medusaOrder.items || [],
    edits: medusaOrder.edits || [],
    gift_card_transactions: medusaOrder.gift_card_transactions || [],
    canceled_at: medusaOrder.canceled_at,
    no_notification: medusaOrder.no_notification,
    idempotency_key: medusaOrder.idempotency_key,
    external_id: medusaOrder.external_id,
    sales_channel_id: medusaOrder.sales_channel_id,
    sales_channel: medusaOrder.sales_channel,
    shipping_total: medusaOrder.shipping_total || 0,
    discount_total: medusaOrder.discount_total || 0,
    tax_total: medusaOrder.tax_total || 0,
    refunded_total: medusaOrder.refunded_total || 0,
    total: medusaOrder.total || 0,
    subtotal: medusaOrder.subtotal || 0,
    paid_total: medusaOrder.paid_total || 0,
    refundable_amount: medusaOrder.refundable_amount || 0,
    gift_card_total: medusaOrder.gift_card_total || 0,
    gift_card_tax_total: medusaOrder.gift_card_tax_total || 0,
    returnable_items: medusaOrder.returnable_items,
    created_at: medusaOrder.created_at,
    updated_at: medusaOrder.updated_at,
    metadata: medusaOrder.metadata,
  }
}

// Helper function to create mock cart
function createMockCart(): Cart {
  return {
    id: `cart_${Date.now()}`,
    items: [],
    region: {
      id: "reg_india",
      name: "India",
      currency_code: "inr",
      tax_rate: 18,
      gift_cards_taxable: true,
      automatic_taxes: true,
      countries: [
        {
          id: "in",
          iso_2: "in",
          iso_3: "ind",
          num_code: 356,
          name: "India",
          display_name: "India",
        },
      ],
      payment_providers: [
        { id: "razorpay", is_installed: true },
        { id: "manual", is_installed: true },
      ],
      fulfillment_providers: [{ id: "manual", is_installed: true }],
      includes_tax: false,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    discounts: [],
    gift_cards: [],
    payment_sessions: [],
    shipping_methods: [],
    type: "default",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subtotal: 0,
    tax_total: 0,
    shipping_total: 0,
    discount_total: 0,
    gift_card_total: 0,
    total: 0,
  }
}
