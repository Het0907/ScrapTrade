import { getApiBaseUrl } from './api'
import { getToken } from './auth'

export async function fetchCart() {
  const token = getToken()
  const res = await fetch(`${getApiBaseUrl()}/api/cart`, {
    headers: { 'Accept': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load cart')
  return res.json()
}

export async function replaceCart(items) {
  const token = getToken()
  const res = await fetch(`${getApiBaseUrl()}/api/cart`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ items })
  })
  if (!res.ok) throw new Error('Failed to save cart')
  return res.json()
}

export async function addCartItem(productId, quantity = 1) {
  const token = getToken()
  const res = await fetch(`${getApiBaseUrl()}/api/cart/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ product: productId, quantity })
  })
  if (!res.ok) throw new Error('Failed to add to cart')
  return res.json()
}

export async function updateCartItem(productId, quantity) {
  const token = getToken()
  const res = await fetch(`${getApiBaseUrl()}/api/cart/item`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ product: productId, quantity })
  })
  if (!res.ok) throw new Error('Failed to update cart')
  return res.json()
}

export async function removeCartItem(productId) {
  const token = getToken()
  const res = await fetch(`${getApiBaseUrl()}/api/cart/item`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ product: productId })
  })
  if (!res.ok) throw new Error('Failed to remove from cart')
  return res.json()
}


