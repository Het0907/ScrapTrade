import { useEffect, useState } from "react"
import { getAuthUser } from "@/lib/auth"
import { addCartItem, fetchCart, removeCartItem as apiRemove, replaceCart, updateCartItem } from "@/lib/cartApi"

export function useCart() {
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = localStorage.getItem('app_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('app_cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    function syncFromStorage(e) {
      if (e.key === 'app_cart') {
        try { setCart(e.newValue ? JSON.parse(e.newValue) : []) } catch {}
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', syncFromStorage)
      return () => {
        window.removeEventListener('storage', syncFromStorage)
      }
    }
  }, [])

  async function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
      return [...prev, { ...product, quantity: 1 }]
    })
    try {
      const user = getAuthUser()
      if (user) await addCartItem(product.id, 1)
    } catch {}
  }

  async function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    try { const user = getAuthUser(); if (user) await apiRemove(productId) } catch {}
  }

  async function updateQuantity(productId, quantity) {
    const q = Math.max(1, Number(quantity) || 1)
    setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: q } : item))
    try { const user = getAuthUser(); if (user) await updateCartItem(productId, q) } catch {}
  }

  async function clearCart() {
    setCart([])
    try { const user = getAuthUser(); if (user) await replaceCart([]) } catch {}
  }

  useEffect(() => {
    // On login, optionally load server cart and merge
    try {
      const user = getAuthUser()
      if (!user) return
      ;(async () => {
        const server = await fetchCart()
        const serverItems = (server.items || []).map(i => ({ id: i.product?._id || i.product, title: i.product?.name || '', price: i.product?.price || 0, quantity: i.quantity }))
        // Simple choose-server strategy: replace local with server
        setCart(serverItems)
      })()
    } catch {}
  }, [])

  const totalItems = cart.reduce((acc, it) => acc + (it.quantity || 1), 0)
  const totalPrice = cart.reduce((acc, it) => acc + (Number(String(it.price).replace(/[^0-9.]/g, '')) || 0) * (it.quantity || 1), 0)

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }
}
