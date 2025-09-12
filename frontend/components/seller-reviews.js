import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

const reviews = [
  {
    id: 1,
    reviewer: {
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    date: "2024-01-20",
    title: "Excellent quality copper wire",
    content:
      "Received exactly what was described. The copper wire was clean and properly sorted. Great communication and fast delivery. Highly recommended!",
    helpful: 12,
    productTitle: "Copper Wire Bundle - 50kg",
    dealValue: "₹15,000",
  },
  {
    id: 2,
    reviewer: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 4,
    date: "2024-01-18",
    title: "Good steel quality, prompt service",
    content:
      "The steel rods were in good condition as advertised. Pickup was arranged quickly and the seller was very professional throughout the process.",
    helpful: 8,
    productTitle: "Steel Rods & Pipes - 100kg",
    dealValue: "₹6,800",
  },
  {
    id: 3,
    reviewer: {
      name: "Rohit Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    rating: 5,
    date: "2024-01-15",
    title: "Best aluminum scrap dealer in Mumbai",
    content:
      "Been dealing with Rajesh Metals for over a year now. Consistent quality, fair pricing, and reliable service. They understand the business well.",
    helpful: 15,
    productTitle: "Aluminum Scrap Mixed - 75kg",
    dealValue: "₹12,500",
  },
  {
    id: 4,
    reviewer: {
      name: "Sunita Joshi",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 4,
    date: "2024-01-12",
    title: "Professional and trustworthy",
    content:
      "Great experience overall. The seller provided detailed photos and specifications before purchase. Minor delay in delivery but quality was as expected.",
    helpful: 6,
    productTitle: "Electronic Components Lot",
    dealValue: "₹8,200",
  },
]

export default function SellerReviews({ sellerId }) {
  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.8</div>
              <div className="flex justify-center my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">156 total reviews</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Recent Reviews</div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Positive (last 30 days)</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Response Rate</div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Responds to reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                      <AvatarFallback>
                        {review.reviewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.reviewer.name}</span>
                        {review.reviewer.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Buyer
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Deal: {review.dealValue}</div>
                    <div className="text-xs">{review.productTitle}</div>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                </div>

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not helpful
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
