import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'
import { useAuth } from '../hooks/useAuth.js'

export function CartProvider({ children }) {
  const { user } = useAuth()

  const cartKey = user ? `ce-cart-${user.uid}` : 'ce-cart-guest'
  const [savedCart, setSavedCart] = useLocalStorage(cartKey, [])
  const [guestCart, setGuestCart] = useState([])

  const cart = user ? savedCart : guestCart
  const setCart = user ? setSavedCart : setGuestCart

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1, note: '' }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function updateNote(itemId, note) {
    if (!user) return
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  const value = {
    cart,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    updateNote,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}