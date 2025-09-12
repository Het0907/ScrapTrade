import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, ShoppingCart, Heart, Eye } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { apiGet, getApiBaseUrl } from "@/lib/api"

// Map backend product to UI product shape
function mapProductToUI(p) {
  return {
    id: p._id,
    title: p.name,
    price: typeof p.price === 'number' ? `₹${p.price.toLocaleString('en-IN')}` : `${p.price ?? ''}`,
    originalPrice: "",
    condition: "",
    location: p.location || "",
    seller: (p.seller && (p.seller.name || p.seller)) || "",
    rating: 0,
    reviews: 0,
    image: (() => {
      const url = (p.images && p.images[0]) || p.image || "/placeholder.svg";
      if (typeof url === 'string' && url.startsWith('/')) {
        return `${getApiBaseUrl()}${url}`;
      }
      return url;
    })(),
    timeLeft: "",
    verified: false,
    category: p.category || "",
    description: p.description || "",
  }
}

function filterAndSortProducts(products, filters) {
  let filtered = products.filter((product) => {
    // Search by title or description
    const matchesSearch = !filters.searchQuery ||
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    // Location filter (partial match)
    const matchesLocation = !filters.location ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());
    // Add more filters as needed (category, condition, price, etc.)
    return matchesSearch && matchesLocation;
  });

  // Sorting
  if (filters.sortBy === "price-low") {
    filtered = filtered.slice().sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
  } else if (filters.sortBy === "price-high") {
    filtered = filtered.slice().sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
  } else if (filters.sortBy === "rating") {
    filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
  } // else default is newest (no-op for now)

  return filtered;
}

export default function ProductGrid({ viewMode, filters, addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (filters?.location) params.append('location', filters.location)
        if (filters?.searchQuery) params.append('q', filters.searchQuery)
        if (filters?.category) params.append('category', filters.category)
        if (filters?.condition) params.append('condition', filters.condition)
        if (filters?.sortBy) params.append('sort', filters.sortBy)
        if (filters?.priceRange && Array.isArray(filters.priceRange)) {
          const [min, max] = filters.priceRange
          if (typeof min === 'number') params.append('minPrice', String(min))
          if (typeof max === 'number') params.append('maxPrice', String(max))
        }
        // future: map category filter id to backend categories if needed
        const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`
        const data = await apiGet(url)
        if (!mounted) return
        const mapped = Array.isArray(data) ? data.map(mapProductToUI) : []
        setProducts(mapped)
      } catch (e) {
        if (!mounted) return
        setError(e?.message || 'Failed to load products')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [filters?.location, filters?.searchQuery, filters?.category, filters?.condition, filters?.sortBy, filters?.priceRange])

  // Refetch when a new product is created via Sell form
  useEffect(() => {
    function onCreated() {
      // trigger a refetch using current filters
      (async () => {
        try {
          const params = new URLSearchParams()
          if (filters?.location) params.append('location', filters.location)
          const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`
          const data = await apiGet(url)
          const mapped = Array.isArray(data) ? data.map(mapProductToUI) : []
          setProducts(mapped)
        } catch (_) {}
      })()
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('product:created', onCreated)
      return () => window.removeEventListener('product:created', onCreated)
    }
  }, [filters?.location, filters?.searchQuery, filters?.category, filters?.condition, filters?.sortBy, filters?.priceRange])

  const filteredProducts = useMemo(() => filterAndSortProducts(products, filters), [products, filters])
  const ProductCard = ({ product }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
        <div className="absolute top-3 right-3 flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
            <Heart className="h-4 w-4" />
          </Button>
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
          <div className="flex items-center gap-2 mt-2">
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" className="h-8" onClick={() => addToCart(product)}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          by <span className="font-medium">{product.seller}</span>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Image */}
          <div className="col-span-3 md:col-span-2">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-20 object-cover rounded-lg"
              />
              {product.verified && <Badge className="absolute -top-2 -right-2 text-xs">Verified</Badge>}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-6 md:col-span-7 space-y-2">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {product.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {product.rating} ({product.reviews})
              </div>
              <Badge variant="outline">{product.condition}</Badge>
            </div>
          </div>

          {/* Price and Actions */}
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
              <Button size="sm" onClick={() => addToCart(product)}>
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
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-8">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="default">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">...</Button>
        <Button variant="outline">12</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
