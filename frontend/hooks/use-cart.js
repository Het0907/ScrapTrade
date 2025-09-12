import { useEffect, useState } from "react"

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

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((acc, it) => acc + (it.quantity || 1), 0)
  const totalPrice = cart.reduce((acc, it) => acc + (Number(String(it.price).replace(/[^0-9.]/g, '')) || 0) * (it.quantity || 1), 0)

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }
}
