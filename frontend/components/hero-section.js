import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Recycle, Shield, Users } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Turn Your <span className="text-primary">Scrap</span> Into Cash
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Connect directly with buyers and sellers in the largest online marketplace for scrap materials. Safe,
                transparent, and profitable.
              </p>
            </div>

            {/* Search CTA */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="What scrap are you looking for?" className="pl-10 h-12" />
              </div>
              <Button size="lg" className="h-12 px-6">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">10k+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
              <img
                src="/scrap-materials-recycling-marketplace-illustration.jpg"
                alt="Scrap materials marketplace illustration"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">₹2.5L+</div>
              <div className="text-sm text-muted-foreground">Monthly Transactions</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Sellers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
