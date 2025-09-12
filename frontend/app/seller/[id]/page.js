import SellerProfile from "@/components/seller-profile"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SellerPage({ params }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SellerProfile sellerId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
