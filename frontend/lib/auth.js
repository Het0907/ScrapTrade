export function saveAuth({ token, user }) {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', token)
  if (user) localStorage.setItem('auth_user', JSON.stringify(user))
}

export function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export function getAuthUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('auth_user')
  return raw ? JSON.parse(raw) : null
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
}


