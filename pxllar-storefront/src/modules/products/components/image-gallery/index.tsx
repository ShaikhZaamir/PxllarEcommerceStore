"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

// Plugins
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <div className="pl-5 flex flex-col gap-y-4">
      {/* Main Image */}
      <Container
        className="relative w-full max-h-[400px] aspect-[4/3] overflow-hidden bg-ui-bg-subtle flex items-center justify-center cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            priority
            className="rounded-rounded"
            alt={`Product image ${selectedImage + 1}`}
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            style={{ objectFit: "contain" }}
          />
        )}
      </Container>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-transparent"
              }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({ src: img.url }))}
        index={selectedImage}
        plugins={[Zoom, Fullscreen]}
        on={{ view: ({ index }) => setSelectedImage(index) }}
      />
    </div>
  )
}

export default ImageGallery


// "use client"

// import { useState } from "react"
// import { HttpTypes } from "@medusajs/types"
// import { Container } from "@medusajs/ui"
// import Image from "next/image"

// type ImageGalleryProps = {
//   images: HttpTypes.StoreProductImage[]
// }

// const ImageGallery = ({ images }: ImageGalleryProps) => {
//   const [selectedImage, setSelectedImage] = useState(0)

//   return (
//     <div className="pl-5 flex flex-col gap-y-4">
//       {/* Main Image */}
//       <Container className="relative w-full max-h-[400px] aspect-[4/3] overflow-hidden bg-ui-bg-subtle flex items-center justify-center">
//         {images[selectedImage]?.url && (
//           <Image
//             src={images[selectedImage].url}
//             priority
//             className="rounded-rounded"
//             alt={`Product image ${selectedImage + 1}`}
//             fill
//             sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
//             style={{
//               objectFit: "contain",
//             }}
//           />
//         )}
//       </Container>


//       {/* Thumbnails */}
//       <div className="grid grid-cols-4 gap-2">
//         {images.map((image, index) => (
//           <button
//             key={image.id}
//             onClick={() => setSelectedImage(index)}
//             className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${selectedImage === index
//               ? "border-black "
//               : "border-transparent hover:border-gray-400"
//               }`}
//           >
//             {image.url && (
//               <Image
//                 src={image.url}
//                 alt={`Thumbnail ${index + 1}`}
//                 fill
//                 className="object-contain"
//                 sizes="100px"
//               />
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ImageGallery
