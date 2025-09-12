import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiGet, apiPost } from "@/lib/api"
import { getToken } from "@/lib/auth"

const fallbackCategories = [
  "Electronics", "Automotive", "Machinery", "Mobile Devices", "Household", "Other"
]
const conditions = ["New", "Good", "Used"]

export default function ProductForm({ onAddProduct }) {
  const [categories, setCategories] = useState(fallbackCategories)
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    image: "",
    contact: "",
    location: "",
    quantity: 1,
  })
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function loadCats() {
      try {
        const data = await apiGet('/api/categories')
        if (!mounted) return
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data.map(c => c.name))
        }
      } catch (_) {
        // keep fallback
      }
    }
    loadCats()
    return () => { mounted = false }
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSelect(name, value) {
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.price || !form.category || !form.condition || !form.contact) return
    try {
      let imageUrl = form.image
      if (file) {
        setUploading(true)
        const data = new FormData()
        data.append('file', file)
        const token = getToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/uploads`, {
          method: 'POST',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: data
        })
        if (!res.ok) throw new Error('Upload failed')
        const out = await res.json()
        imageUrl = out.url
        setUploading(false)
      }
      const token = getToken()
      const payload = {
        name: form.title,
        description: form.description,
        price: parseFloat(String(form.price).replace(/[^0-9.]/g, '')),
        images: imageUrl ? [imageUrl] : [],
        quantity: Number(form.quantity) || 1,
        category: form.category,
        location: form.location,
        condition: form.condition,
      }
      const created = await apiPost('/api/products', payload, token)
      try {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('product:created', { detail: created }))
        }
      } catch (_) {}
      onAddProduct?.(created)
      setForm({ title: "", price: "", category: "", condition: "", description: "", image: "", contact: "", location: "", quantity: 1 })
    } catch (err) {
      // surface errors minimally; UI could be enhanced later
      alert(err?.message || 'Failed to create product')
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>List New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input name="title" placeholder="Product Title" value={form.title} onChange={handleChange} required className="flex-1" />
            <Select value={form.category} onValueChange={v => handleSelect("category", v)}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="z-[1100]">
                {categories.length === 0 ? (
                  <SelectItem disabled value="">No categories</SelectItem>
                ) : categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea name="description" placeholder="Detailed Description" value={form.description} onChange={handleChange} required />
          <Select value={form.condition} onValueChange={v => handleSelect("condition", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent className="z-[1100]">
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond}>{cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input name="price" placeholder="Product Price (e.g. ₹1000)" value={form.price} onChange={handleChange} required />
          <Input name="quantity" type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
          <div className="flex gap-3 items-center">
            <Input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
            <span className="text-xs text-muted-foreground">{uploading ? 'Uploading...' : file ? file.name : 'or paste image URL'}</span>
          </div>
          <Input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
          <Input name="location" placeholder="Location (e.g. Mumbai)" value={form.location} onChange={handleChange} />
          <Input name="contact" placeholder="Contact Details (phone/email)" value={form.contact} onChange={handleChange} required />
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}
