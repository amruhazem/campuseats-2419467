import { useNavigate } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {             // no props any more
  const { cart, total, changeQty, removeFromCart, updateNote, placeOrder } = useCart()
  const navigate = useNavigate()

  function handleOrder(details) {
    placeOrder(details)
    navigate('/orders') // TODO: go to the orders page.
  }

// 1. Empty Cart State
  if (cart.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your cart</h2>
        <p className="muted">Your cart is empty. Pick something from a menu.</p>
      </section>
    )
  }

  // 2. Full Cart State
  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
                onUpdateNote={updateNote} // Feature 7 order note handler
              />
            ))}
          </ul>
          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>
        <CheckoutForm onPlaceOrder={handleOrder} />
      </div>
    </section>
  )
}

export default CartPage