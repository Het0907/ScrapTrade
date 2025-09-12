"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const categories = [
  { id: "electronics", name: "Electronics", count: 245 },
  { id: "automotive", name: "Automotive", count: 189 },
  { id: "electrical", name: "Electrical", count: 321 },
  { id: "machinery", name: "Machinery", count: 98 },
  { id: "mobile", name: "Mobile Devices", count: 156 },
  { id: "household", name: "Household", count: 203 },
]

const conditions = [
  { id: "excellent", name: "Excellent", count: 89 },
  { id: "good", name: "Good", count: 456 },
  { id: "fair", name: "Fair", count: 234 },
  { id: "poor", name: "Poor", count: 67 },
]

const sellers = [
  { id: "verified", name: "Verified Sellers Only", count: 678 },
  { id: "premium", name: "Premium Sellers", count: 234 },
  { id: "local", name: "Local Sellers", count: 345 },
]

export default function ProductFilters({ filters, setFilters }) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    setFilters({
      category: "",
      condition: "",
      priceRange: [0, 100000],
      location: "",
      sortBy: "newest",
    })
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && value !== "" && !(Array.isArray(value) && value[0] === 0 && value[1] === 100000),
  ).length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories.find((c) => c.id === filters.category)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("category", "")} />
                </Badge>
              )}
              {filters.condition && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {conditions.find((c) => c.id === filters.condition)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("condition", "")} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={100000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.category === category.id}
                  onCheckedChange={(checked) => updateFilter("category", checked ? category.id : "")}
                />
                <label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {conditions.map((condition) => (
            <div key={condition.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={condition.id}
                  checked={filters.condition === condition.id}
                  onCheckedChange={(checked) => updateFilter("condition", checked ? condition.id : "")}
                />
                <label htmlFor={condition.id} className="text-sm cursor-pointer">
                  {condition.name}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">({condition.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Seller Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Seller Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sellers.map((seller) => (
            <div key={seller.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={seller.id} />
                <label htmlFor={seller.id} className="text-sm cursor-pointer">
                  {seller.name}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">({seller.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
