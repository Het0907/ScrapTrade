"use client"

import { useState, useEffect } from "react"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import ProductSearch from "@/components/product-search"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import CartDrawer from "@/components/cart-drawer"
import { SlidersHorizontal, Grid3X3, List } from "lucide-react"

export default function ProductCatalogue({ initialCategory = "" }) {
  const [viewMode, setViewMode] = useState("grid")
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    priceRange: [0, 100000],
    location: "",
    sortBy: "newest",
    searchQuery: "",
  })

  // initialize from URL-selected category
  useEffect(() => {
    if (initialCategory) {
      setFilters((f)=> ({ ...f, category: initialCategory }))
    }
  }, [initialCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Scrap Materials</h1>
        <p className="text-muted-foreground text-lg">
          Discover quality scrap materials from verified sellers across India
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6">
        <ProductSearch
          searchQuery={filters.searchQuery}
          setSearchQuery={(q) => setFilters(f => ({ ...f, searchQuery: q }))}
          location={filters.location}
          setLocation={(loc) => setFilters(f => ({ ...f, location: loc }))}
          sortBy={filters.sortBy}
          setSortBy={(sort) => setFilters(f => ({ ...f, sortBy: sort }))}
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-muted-foreground">Showing 1,247 results</span>
          </div>

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

      {/* Main Content */}
      {/* Floating Cart Button */}
      <button
        className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-primary/90 transition"
        onClick={() => setCartOpen(true)}
      >
        🛒
        <span className="font-bold">{cart.length}</span>
      </button>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? "block" : "hidden"} lg:col-span-1`}>
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid viewMode={viewMode} filters={filters} addToCart={addToCart} />
        </div>
      </div>
    </div>
  )
}
