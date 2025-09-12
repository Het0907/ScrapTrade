import { useState } from "react"

export function useCart() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart((prev) => {
      // Prevent duplicates by id
      if (prev.find((item) => item.id === product.id)) return prev
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}
