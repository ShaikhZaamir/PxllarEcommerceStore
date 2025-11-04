// import { listCategories } from "@lib/data/categories"
// import { listCollections } from "@lib/data/collections"
// import { Text, clx } from "@medusajs/ui"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

// export default async function Footer() {
//   const { collections } = await listCollections({
//     fields: "*products",
//   })
//   const productCategories = await listCategories()

//   return (
//     <footer className="px-6 w-full">
//       <div className="flex flex-col w-full">
//         <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-20">
//           <div>
//             <LocalizedClientLink
//               href="/"
//               className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
//             >
//               Medusa Store
//             </LocalizedClientLink>
//           </div>
//           <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
//             {productCategories && productCategories?.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Categories
//                 </span>
//                 <ul
//                   className="grid grid-cols-1 gap-2"
//                   data-testid="footer-categories"
//                 >
//                   {productCategories?.slice(0, 6).map((c) => {
//                     if (c.parent_category) {
//                       return
//                     }

//                     const children =
//                       c.category_children?.map((child) => ({
//                         name: child.name,
//                         handle: child.handle,
//                         id: child.id,
//                       })) || null

//                     return (
//                       <li
//                         className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
//                         key={c.id}
//                       >
//                         <LocalizedClientLink
//                           className={clx(
//                             "hover:text-ui-fg-base",
//                             children && "txt-small-plus"
//                           )}
//                           href={`/categories/${c.handle}`}
//                           data-testid="category-link"
//                         >
//                           {c.name}
//                         </LocalizedClientLink>
//                         {children && (
//                           <ul className="grid grid-cols-1 ml-3 gap-2">
//                             {children &&
//                               children.map((child) => (
//                                 <li key={child.id}>
//                                   <LocalizedClientLink
//                                     className="hover:text-ui-fg-base"
//                                     href={`/categories/${child.handle}`}
//                                     data-testid="category-link"
//                                   >
//                                     {child.name}
//                                   </LocalizedClientLink>
//                                 </li>
//                               ))}
//                           </ul>
//                         )}
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//             )}
//             {collections && collections.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Collections
//                 </span>
//                 <ul
//                   className={clx(
//                     "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
//                     {
//                       "grid-cols-2": (collections?.length || 0) > 3,
//                     }
//                   )}
//                 >
//                   {collections?.slice(0, 6).map((c) => (
//                     <li key={c.id}>
//                       <LocalizedClientLink
//                         className="hover:text-ui-fg-base"
//                         href={`/collections/${c.handle}`}
//                       >
//                         {c.title}
//                       </LocalizedClientLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div className="flex flex-col gap-y-2">
//               <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
//               <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
//                 <li>
//                   <a
//                     href="https://github.com/medusajs"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://docs.medusajs.com"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     Documentation
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://github.com/medusajs/nextjs-starter-medusa"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     Source code
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
//           <Text className="txt-compact-small">
//             © {new Date().getFullYear()} Medusa Store. All rights reserved.
//           </Text>
//           <MedusaCTA />
//         </div>
//       </div>
//     </footer>
//   )
// }


// import { Mail, Phone, MapPin } from "lucide-react"

// export default async function Footer() {
//   const storeName = "Pxllar Store"

//   return (
//     <footer className="bg-white border-t border-gray-200 py-12 lg:py-16">
//       <div className="mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           <div className="sm:col-span-2 lg:col-span-1">
//             <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-black">{storeName}</h3>
//             <p className="text-gray-600 mb-6 text-sm lg:text-base leading-relaxed">
//               Your destination for innovative products that shape tomorrow. Quality, style, and innovation in every
//               purchase.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-black">Quick Links</h4>
//             <ul className="space-y-2 lg:space-y-3">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="/products" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Products
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#categories-section"
//                   className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base"
//                 >
//                   Categories
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Sale
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Blog
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-black">Customer Service</h4>
//             <ul className="space-y-2 lg:space-y-3">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Contact Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Shipping Info
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Returns
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   Size Guide
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base">
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-black">Contact Info</h4>
//             <div className="space-y-3 lg:space-y-4">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-black mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-600 text-sm lg:text-base">123 Future Street, Tech City, TC 12345</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-black flex-shrink-0" />
//                 <span className="text-gray-600 text-sm lg:text-base">+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-black flex-shrink-0" />
//                 <span className="text-gray-600 text-sm lg:text-base break-all">
//                   hello@{storeName.toLowerCase().replace(/\s+/g, "")}.com
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center">
//           <p className="text-gray-600 text-sm lg:text-base">
//             © 2024 {storeName}. All rights reserved. |
//             <a href="#" className="hover:text-black transition-colors ml-1">
//               Privacy Policy
//             </a>{" "}
//             |
//             <a href="#" className="hover:text-black transition-colors ml-1">
//               Terms of Service
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }


import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "components/ui/button"
import { Separator } from "components/ui/separator"

export default async function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Pxllar Store</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover unique fashion, home decor, gifts, and handmade items from trusted sellers across India. Curated
              with love for the modern lifestyle.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/help" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Returns & Exchanges
              </Link>
              <Link
                href="/size-guide"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Size Guide
              </Link>
              <Link
                href="/track-order"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Track Your Order
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@pxllarstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Business District,
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">© 2024 Pxllar Store. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-blue-600 text-white text-xs rounded">UPI</div>
              <div className="px-2 py-1 bg-orange-600 text-white text-xs rounded">Card</div>
              <div className="px-2 py-1 bg-green-600 text-white text-xs rounded">COD</div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
