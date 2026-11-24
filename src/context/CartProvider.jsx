import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'
import { useAuth } from '../hooks/useAuth.js'

// Owns the cart and the orders, and shares them with every component inside it.
export function CartProvider({ children }) {
  const { user } = useAuth()

  // Save per user when signed in, guests get an empty default that is not persisted
  const cartKey = user ? `ce-cart-${user.uid}` : 'ce-cart-guest'
  const ordersKey = user ? `ce-orders-${user.uid}` : 'ce-orders-guest'

  const [savedCart, setSavedCart] = useLocalStorage(cartKey, [])
  const [savedOrders, setSavedOrders] = useLocalStorage(ordersKey, [])
  const [guestCart, setGuestCart] = useState([])
  const [guestOrders, setGuestOrders] = useState([])

  const cart = user ? savedCart : guestCart
  const setCart = user ? setSavedCart : setGuestCart
  const orders = user ? savedOrders : guestOrders
  const setOrders = user ? setSavedOrders : setGuestOrders

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

  function placeOrder(details) {
    const newOrder = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...details,
      lines: cart, //holds cart items + notes
      total: cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    return newOrder
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    updateNote,
    placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}