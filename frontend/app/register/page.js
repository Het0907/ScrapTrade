"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiPost } from "@/lib/api"
import Link from "next/link"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', location: '', role: 'Buyer' })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }) }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await apiPost('/api/auth/register', form)
      setSuccess(true)
    } catch (err) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
          {success ? (
            <div className="space-y-3">
              <div className="text-green-600">Registration successful. You can now <Link href="/login" className="underline">login</Link>.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              <Input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
              <Input name="location" placeholder="Location (optional)" value={form.location} onChange={handleChange} />
              <div>
                <label className="text-sm mb-1 block">Role</label>
                <Select value={form.role} onValueChange={(v)=>setForm({...form, role: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Buyer">Buyer</SelectItem>
                    <SelectItem value="Seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full">{loading ? 'Registering...' : 'Register'}</Button>
            </form>
          )}
          <div className="text-sm text-muted-foreground mt-3">
            Already have an account? <Link className="underline" href="/login">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


