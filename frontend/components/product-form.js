import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  "Electronics", "Automotive", "Machinery", "Mobile Devices", "Household", "Other"
]
const conditions = ["Excellent", "Good", "Fair", "Poor"]

export default function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    image: "",
    contact: "",
    location: "",
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSelect(name, value) {
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.price || !form.category || !form.condition || !form.contact) return
    onAddProduct({ ...form, id: Date.now() })
    setForm({ title: "", price: "", category: "", condition: "", description: "", image: "", contact: "", location: "" })
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
              <SelectContent>
                {categories.map((cat) => (
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
            <SelectContent>
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond}>{cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input name="price" placeholder="Product Price (e.g. ₹1000)" value={form.price} onChange={handleChange} required />
          <Input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
          <Input name="location" placeholder="Location (e.g. Mumbai)" value={form.location} onChange={handleChange} />
          <Input name="contact" placeholder="Contact Details (phone/email)" value={form.contact} onChange={handleChange} required />
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}
