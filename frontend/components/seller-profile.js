"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SellerListings from "@/components/seller-listings"
import ProductForm from "@/components/product-form"
import SellerReviews from "@/components/seller-reviews"
import SellerStats from "@/components/seller-stats"
import { Star, MapPin, Calendar, Phone, Mail, MessageCircle, Shield, Award, Clock, CheckCircle } from "lucide-react"
import { apiGet } from "@/lib/api"

// Mock seller data
export default function SellerProfile({ sellerId }) {
  const [sellerData, setSellerData] = useState({
    id: "rajesh-metals",
    name: "Rajesh Metals",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/seller-warehouse-scrap-metal.jpg",
    rating: 4.8,
    totalReviews: 156,
    joinDate: "2022-03-15",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "contact@rajeshmetals.com",
    verified: true,
    premium: true,
    description:
      "Leading scrap metal dealer in Mumbai with over 15 years of experience. We specialize in copper, aluminum, and steel recycling with guaranteed quality and fair pricing.",
    businessHours: "Mon-Sat: 9:00 AM - 6:00 PM",
    responseTime: "Usually responds within 2 hours",
    totalListings: 45,
    completedDeals: 234,
    categories: ["Electronics", "Automotive", "Machinery"],
    certifications: ["ISO 9001", "Environmental Compliance", "Metal Recycling License"],
    policies: {
      returns: "7-day return policy",
      shipping: "Free shipping above ₹5,000",
      payment: "Cash, UPI, Bank Transfer",
    },
  })

  const [activeTab, setActiveTab] = useState("listings")
  const [products, setProducts] = useState([])
  function handleAddProduct(product) {
    setProducts((prev) => [product, ...prev])
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [seller, allProducts] = await Promise.all([
          apiGet(`/api/sellers/${sellerId}`),
          apiGet(`/api/products`),
        ])
        if (!mounted) return
        setSellerData((prev) => ({ ...prev, ...(seller || {}) }))
        const sellerIdFromSeller = seller?._id
        const sellerProducts = (allProducts || []).filter((p) => {
          const sid = typeof p.seller === 'object' ? p.seller?._id : p.seller
          return sid && sellerIdFromSeller && String(sid) === String(sellerIdFromSeller)
        })
        setProducts(sellerProducts)
      } catch (e) {
        // non-fatal: keep mock data
      }
    }
    load()
    return () => { mounted = false }
  }, [sellerId])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img
          src={sellerData.coverImage || "/placeholder.svg"}
          alt="Seller warehouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Seller Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={sellerData.avatar || "/placeholder.svg"} alt={sellerData.name} />
              <AvatarFallback className="text-2xl font-bold">
                {sellerData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{sellerData.name}</h1>
                {sellerData.verified && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {sellerData.premium && (
                  <Badge className="bg-yellow-500 text-yellow-50">
                    <Award className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{sellerData.rating}</span>
                  <span>({sellerData.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{sellerData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(sellerData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">Listings ({products.length || sellerData.totalListings})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({sellerData.totalReviews || 0})</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-6">
              <ProductForm onAddProduct={handleAddProduct} />
              <SellerListings sellerId={sellerId} products={products} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <SellerReviews sellerId={sellerId} />
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {sellerData?.name || ''}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{sellerData?.description || ''}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications & Licenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(sellerData?.certifications || []).map((cert, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Returns</span>
                      <span className="text-sm text-muted-foreground">{sellerData?.policies?.returns || ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shipping</span>
                      <span className="text-sm text-muted-foreground">{sellerData?.policies?.shipping || ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Payment</span>
                      <span className="text-sm text-muted-foreground">{sellerData?.policies?.payment || ''}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SellerStats seller={sellerData} />

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{sellerData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{sellerData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{sellerData.businessHours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{sellerData.responseTime}</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Specializes In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(sellerData?.categories || []).map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
