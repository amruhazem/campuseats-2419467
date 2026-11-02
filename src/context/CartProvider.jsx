import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

// Owns the cart and the orders, and shares them with every component inside it.
export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])   // { item, qty }
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

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
    lines: cart, // Named 'lines' per lecturer sheet, holds cart items + notes
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