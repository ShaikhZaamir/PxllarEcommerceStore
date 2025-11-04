import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "components/ui/card"

const categories = [
    {
        name: "Fashion",
        slug: "fashion",
        image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1757234083/2_hrc07o.png",
        description: "Trendy clothes & accessories",
    },
    {
        name: "Accessories",
        slug: "accessories",
        image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1757234084/4_oqw65x.png",
        description: "Trendy scrunchies, jewelry & more",
    },
    {
        name: "Gifts",
        slug: "gifts",
        image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1757234083/3_awjvf7.png",
        description: "Perfect for every occasion",
    },
    {
        name: "Handmade",
        slug: "handmade",
        image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1757234084/5_qtqphk.png",
        description: "Unique artisan creations",
    },
]

export function CategoryGrid() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="mx-auto px-2 md:px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover curated collections from trusted sellers across India
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/in/store?category=${category.slug}`} >
                            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={category.image || "/placeholder.svg"}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute " />
                                        <div className="absolute bottom-4 left-2.5 md:left-4 text-black">
                                            <h3 className="font-semibold text-lg">{category.name}</h3>
                                            <p className="text-sm opacity-90">{category.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
