import ProductCatalogue from "@/components/product-catalogue"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductCatalogue />
      </main>
      <Footer />
    </div>
  )
}
