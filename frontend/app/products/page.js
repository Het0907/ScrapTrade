import ProductCatalogue from "@/components/product-catalogue"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function ProductsPage({ searchParams }) {
  const initialCategory = searchParams?.category || ""
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductCatalogue initialCategory={initialCategory} />
      </main>
      <Footer />
    </div>
  )
}
