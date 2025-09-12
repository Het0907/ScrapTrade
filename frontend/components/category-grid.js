"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Car, Zap, Wrench, Smartphone, Home, ArrowRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { apiGet } from "@/lib/api"

const defaultCategories = [
  { name: "Electronics", icon: Cpu, description: "Computers, phones, components", color: "bg-blue-50 text-blue-600" },
  { name: "Automotive", icon: Car, description: "Car parts, engines, tires", color: "bg-red-50 text-red-600" },
  { name: "Electrical", icon: Zap, description: "Wires, motors, appliances", color: "bg-yellow-50 text-yellow-600" },
  { name: "Machinery", icon: Wrench, description: "Industrial equipment, tools", color: "bg-gray-50 text-gray-600" },
  { name: "Mobile Devices", icon: Smartphone, description: "Phones, tablets, accessories", color: "bg-purple-50 text-purple-600" },
  { name: "Household", icon: Home, description: "Furniture, appliances, decor", color: "bg-green-50 text-green-600" },
]

export default function CategoryGrid() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await apiGet('/api/categories')
        if (!mounted) return
        setCategories(Array.isArray(data) ? data : [])
      } catch (e) {
        // fallback to defaults
        setError(e?.message || 'Failed to load categories')
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const combined = useMemo(() => {
    if (!categories || categories.length === 0) return defaultCategories
    // Map API categories (name/slug) to UI cards with rotating icons/colors
    const icons = [Cpu, Car, Zap, Wrench, Smartphone, Home]
    const colors = [
      "bg-blue-50 text-blue-600",
      "bg-red-50 text-red-600",
      "bg-yellow-50 text-yellow-600",
      "bg-gray-50 text-gray-600",
      "bg-purple-50 text-purple-600",
      "bg-green-50 text-green-600",
    ]
    return categories.map((c, idx) => ({
      name: c.name,
      description: c.slug,
      icon: icons[idx % icons.length],
      color: colors[idx % colors.length],
      count: "",
    }))
  }, [categories])
  return (
    <section id="categories" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combined.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="text-sm font-medium text-primary">{category.count}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
