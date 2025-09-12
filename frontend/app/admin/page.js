"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiGet, apiPost } from "@/lib/api"
import { getAuthUser, getToken } from "@/lib/auth"

export default function AdminPage() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [error, setError] = useState("")
  const user = typeof window !== 'undefined' ? getAuthUser() : null

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      if (typeof window !== 'undefined') window.location.href = '/login'
      return
    }
    async function load() {
      try {
        const data = await apiGet('/api/categories')
        setCategories(data)
      } catch (e) {
        setError(e?.message || 'Failed to load categories')
      }
    }
    load()
  }, [])

  async function addCategory(e) {
    e.preventDefault()
    try {
      const token = getToken()
      const created = await apiPost('/api/categories', { name, slug }, token)
      setCategories((prev)=>[...prev, created])
      setName("")
      setSlug("")
    } catch (e) {
      setError(e?.message || 'Failed to add category')
    }
  }

  async function deleteCategory(id) {
    try {
      const token = getToken()
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setCategories((prev)=>prev.filter(c=>c._id!==id))
    } catch (e) {
      setError(e?.message || 'Failed to delete category')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin: Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <form onSubmit={addCategory} className="flex gap-2 mb-4">
            <Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            <Input placeholder="Slug" value={slug} onChange={(e)=>setSlug(e.target.value)} required />
            <Button type="submit">Add</Button>
          </form>
          <ul className="space-y-2">
            {categories.map((c)=> (
              <li key={c._id} className="flex items-center justify-between border rounded p-2">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.slug}</div>
                </div>
                <Button variant="outline" onClick={()=>deleteCategory(c._id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}


