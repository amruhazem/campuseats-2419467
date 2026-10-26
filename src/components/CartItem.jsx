// One row in the cart. It shows data and reports clicks upward; it owns no state.
function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
  const { item, qty, note } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>

      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{qty}</span>
        {/* TODO 1: add one */}
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>

      {/* TODO 2: price × qty, 2 decimals */}
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>

      {/* Feature 7: Order notes per item */}
      <div style={{ width: '100%', marginTop: '0.5rem' }}>
        <textarea
          placeholder="Add order note (e.g. less spicy, no onions)..."
          value={note || ''}
          onChange={(e) => onUpdateNote(item.id, e.target.value)}
          rows="2"
          style={{ width: '100%', resize: 'vertical' }}
        />
      </div>

      {/* TODO 3: Remove button */}
      <button type="button" className="link danger" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  )
}

export default CartItem