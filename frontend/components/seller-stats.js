import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Package, CheckCircle, TrendingUp } from "lucide-react"

export default function SellerStats({ seller }) {
  const stats = [
    {
      label: "Total Listings",
      value: seller.totalListings,
      icon: Package,
      color: "text-blue-600",
    },
    {
      label: "Completed Deals",
      value: seller.completedDeals,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Success Rate",
      value: "98%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seller Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Overview */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <span className="text-3xl font-bold">{seller.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">Based on {seller.totalReviews} reviews</p>
          <div className="flex justify-center">
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              Excellent Seller
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <span className="font-bold">{stat.value}</span>
              </div>
            )
          })}
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Rating Breakdown</h4>
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage = rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1
            return (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-3">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-muted-foreground w-8">{percentage}%</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
