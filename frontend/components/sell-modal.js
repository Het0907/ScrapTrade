import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import ProductForm from "@/components/product-form"

export default function SellModal({ open, onClose }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!open || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-auto max-h-[90vh]">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">List a New Product</h2>
        {showSuccess ? (
          <div className="text-green-600 font-semibold text-center py-8">Product listed successfully!</div>
        ) : (
          <ProductForm onAddProduct={() => setShowSuccess(true)} />
        )}
        {showSuccess && (
          <Button className="w-full mt-4" onClick={onClose}>Close</Button>
        )}
      </div>
    </div>,
    document.body
  )
}
