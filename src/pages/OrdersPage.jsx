import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My orders</h2>
        <p className="muted">
          No orders yet. <Link to="/">Browse vendors</Link>
        </p>
      </section>
    )
  }

return (
    <section>
      <h2 className="section-title">My orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              Pickup {order.pickupTime} Mahallah {order.mahallah}
            </p>
            <ul className="muted">
              {(order.lines || order.items)?.map((line) => (
                <li key={line.item.id}>
                  {line.qty}x {line.item.name} - RM {(line.item.price * line.qty).toFixed(2)}
                  {line.note && <p className="muted">Note: "{line.note}"</p>}
                </li>
              ))}
            </ul>
            <p className="price">RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage