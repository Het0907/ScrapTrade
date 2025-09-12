"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, ShoppingCart, Eye, Grid3X3, List } from "lucide-react"

const sellerProducts = [
  {
    id: 1,
    title: "Copper Wire Bundle - 50kg",
    price: "₹15,000",
    originalPrice: "₹18,000",
    condition: "Good",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    reviews: 156,
    image: "/copper-wire-scrap-bundle.jpg",
    timeLeft: "2 days left",
    category: "Electronics",
    description: "High-quality copper wire bundle, perfect for recycling. Clean and sorted.",
    postedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Steel Rods & Pipes - 100kg",
    price: "₹6,800",
    originalPrice: "₹8,000",
    condition: "Good",
    location: "Mumbai, Maharashtra",
    rating: 4.6,
    reviews: 124,
    image: "/steel-rods-pipes-scrap-metal.jpg",
    timeLeft: "3 days left",
    category: "Machinery",
    description: "Construction grade steel rods and pipes. Suitable for recycling and reuse.",
    postedDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Aluminum Scrap Mixed - 75kg",
    price: "₹12,500",
    originalPrice: "₹14,000",
    condition: "Excellent",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 89,
    image: "/aluminum-sheets-scrap-metal.jpg",
    timeLeft: "5 days left",
    category: "Automotive",
    description: "Premium aluminum scrap from automotive industry. Various grades available.",
    postedDate: "2024-01-10",
  },
]

export default function SellerListings({ sellerId, products: extraProducts = [] }) {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")

  const ProductCard = ({ product }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90">
            {product.condition}
          </Badge>
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
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" className="h-8">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Posted on {new Date(product.postedDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 md:col-span-2">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-20 object-cover rounded-lg"
            />
          </div>

          <div className="col-span-6 md:col-span-7 space-y-2">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {product.rating} ({product.reviews})
              </div>
              <Badge variant="outline">{product.condition}</Badge>
              <span>Posted {new Date(product.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="col-span-3 text-right space-y-2">
            <div>
              <div className="text-xl font-bold text-primary">{product.price}</div>
              <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{sellerProducts.length} listings</span>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...(extraProducts || []), ...sellerProducts].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {[...(extraProducts || []), ...sellerProducts].map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
