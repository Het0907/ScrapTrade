"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
const SellModal = dynamic(() => import("@/components/sell-modal"), { ssr: false })

export default function Header() {
  const [sellOpen, setSellOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SM</span>
            </div>
            <span className="font-bold text-xl text-foreground">ScrapMart</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for scrap materials..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground">
              <a href="/products">Browse</a>
            </Button>
              <Button variant="ghost" className="text-foreground" onClick={() => setSellOpen(true)}>
                Sell
              </Button>
              <SellModal open={sellOpen} onClose={() => setSellOpen(false)} />
            <Button variant="ghost" className="text-foreground">
              Categories
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
