import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Car, Zap, Wrench, Smartphone, Home, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    icon: Cpu,
    count: "2.5k+ items",
    color: "bg-blue-50 text-blue-600",
    description: "Computers, phones, components",
  },
  {
    name: "Automotive",
    icon: Car,
    count: "1.8k+ items",
    color: "bg-red-50 text-red-600",
    description: "Car parts, engines, tires",
  },
  {
    name: "Electrical",
    icon: Zap,
    count: "3.2k+ items",
    color: "bg-yellow-50 text-yellow-600",
    description: "Wires, motors, appliances",
  },
  {
    name: "Machinery",
    icon: Wrench,
    count: "900+ items",
    color: "bg-gray-50 text-gray-600",
    description: "Industrial equipment, tools",
  },
  {
    name: "Mobile Devices",
    icon: Smartphone,
    count: "1.5k+ items",
    color: "bg-purple-50 text-purple-600",
    description: "Phones, tablets, accessories",
  },
  {
    name: "Household",
    icon: Home,
    count: "2.1k+ items",
    color: "bg-green-50 text-green-600",
    description: "Furniture, appliances, decor",
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
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
