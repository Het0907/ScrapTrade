import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    title: "Copper Wire Bundle - 50kg",
    price: "₹15,000",
    originalPrice: "₹18,000",
    condition: "Good",
    location: "Mumbai, Maharashtra",
    seller: "Rajesh Metals",
    rating: 4.8,
    reviews: 156,
    image: "/copper-wire-scrap-bundle.jpg",
    timeLeft: "2 days left",
    verified: true,
  },
  {
    id: 2,
    title: "Aluminum Sheets - Mixed Grade",
    price: "₹8,500",
    originalPrice: "₹10,000",
    condition: "Excellent",
    location: "Delhi, NCR",
    seller: "Metro Scrap Co.",
    rating: 4.9,
    reviews: 203,
    image: "/aluminum-sheets-scrap-metal.jpg",
    timeLeft: "5 days left",
    verified: true,
  },
  {
    id: 3,
    title: "Electronic Components Lot",
    price: "₹12,000",
    originalPrice: "₹15,000",
    condition: "Fair",
    location: "Bangalore, Karnataka",
    seller: "TechScrap Solutions",
    rating: 4.7,
    reviews: 89,
    image: "/electronic-components-circuit-boards-scrap.jpg",
    timeLeft: "1 day left",
    verified: false,
  },
  {
    id: 4,
    title: "Steel Rods & Pipes - 100kg",
    price: "₹6,800",
    originalPrice: "₹8,000",
    condition: "Good",
    location: "Chennai, Tamil Nadu",
    seller: "Southern Steel",
    rating: 4.6,
    reviews: 124,
    image: "/steel-rods-pipes-scrap-metal.jpg",
    timeLeft: "3 days left",
    verified: true,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Listings</h2>
            <p className="text-muted-foreground text-lg">Hand-picked quality scrap materials from verified sellers</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            View All Listings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="secondary" className="bg-background/90">
                    {product.condition}
                  </Badge>
                  {product.verified && <Badge className="bg-primary text-primary-foreground">Verified</Badge>}
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {product.timeLeft}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <Button size="sm" className="h-8">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  by <span className="font-medium">{product.seller}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline">View All Listings</Button>
        </div>
      </div>
    </section>
  )
}
