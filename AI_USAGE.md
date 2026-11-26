# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): gemini
- What I asked for: 
    their perspective for reflection 
- What I kept, changed or rejected, and why:
     i kept the fundamental response it gave me, and after understand the context i change the way to express it in my own understanding and in more simpler language 
- One thing the AI got wrong and how I fixed it:
    it gave me a line of coding rather than a direct answer on what the question ask as it is not considered wrong, it just that it did not give me direct explanation but it explain the question to me in the form of code. I dont consider this as fix but i just open informative website like https://react.dev/reference/react/Fragment to get a more clearer answer.

## Week 2
- Tool(s): None
- What I asked for: None
- What I kept, changed or rejected, and why: None
- One thing the AI got wrong and how I fixed it: None

## Week 3
- Tool(s): gemini
- What I asked for: 
    -refactoring cart logic to { item, qty }, fetching data via useEffect, implementing view switching, and adding checkout validation.
    -help me with todo task not all task
- What I kept, changed or rejected, and why: Kept all state, fetch, and validation code because it followed the lab instructions.
- One thing the AI got wrong and how I fixed it: The AI generated code with a missing closing brace } in App.jsx, which I fixed by adding the brace before export default App.

## Week 4

- AI Tools Used: Gemini
- What I asked: 
  - Guidance on refactoring state management to `CartProvider` and extracting custom hooks (`useLocalStorage`, `useVendors`, `useCart`).
  - Assistance setting up React Router v8 route configuration (`Layout`, dynamic `vendor/:id` routing, `useNavigate`).
- What I kept or changed: 
  - Kept the centralized `CartProvider` and `useCart` hook structure.
  - Adjusted `OrdersPage.jsx` rendering to support Feature 7 item notes.
- One thing the AI got wrong: 
  - The AI initially suggested `react_router` with an underscore in an import statement, which caused a Vite module resolution error until fixed to `react-router`.

## Week 5

- AI Tools Used: Gemini
- What I asked: 
  - Help completing the TODOs in `AuthProvider.jsx` and verifying my Lab 5 Firebase Authentication and `ProtectedRoute` checklist.
  - Guidance on updating `CartProvider.jsx` and `CartItem.jsx` to store cart items and per-item order notes per `user.uid` for Feature 7.
- What I kept or changed: 
  - Kept the `AuthProvider`, `useAuth`, and `ProtectedRoute` pattern from the lab sheet.
  - Adapted `CartProvider.jsx` to use `ce-cart-<uid>` and `ce-orders-<uid>` keys when signed in while keeping my existing Week 4 state handlers (`addToCart`, `changeQty`, `removeFromCart`, `updateNote`, `placeOrder`).
  - Updated `CartItem.jsx` to show `"Log in to add notes"` for guests and the editable `<textarea>` for signed-in users.
- One thing the AI got wrong: 
  - Initially provided a `CartProvider` example using generic property names (`items`, `updateQty`) instead of my existing Week 4 names (`cart`, `changeQty`), which I adjusted to match my codebase.

## Week 6

- AI Tool used: Gemini
- What I asked:
  - Help structuring the Firestore service functions (`vendors.js` and `orders.js`) and connecting per-item order notes (Digit 7) into `placeOrders` and `OrdersPage.jsx`.
  - Troubleshooting ESLint warnings in `useVendors.js`, a CSS-in-JSX syntax error in `OrderStatus.jsx`, and a missing module import error for `OrderActions.jsx`.
  - Understanding why `OrderActions` disappears once an order's `status` changes from `'Received'` to `'Preparing'`.
- What I kept or changed:
  - Kept the `writeBatch` order-splitting logic per vendor and updated `placeOrders` to store each cart line's `note` field inside the `items` array in Firestore.
  - Updated `OrdersPage.jsx` to read flat item properties (`i.itemId`, `i.name`, `i.price`, `i.note`) from Firestore instead of the nested `line.item` shape used in Week 4 `localStorage`.
  - Kept the standard `useVendors.js` hook structure from the lab sheet after confirming the ESLint `set-state-in-effect` squiggle was only a linter style warning and not a runtime error.
- One thing the AI got wrong:
  - During the B5 walkthrough, the AI jumped straight to building `OrderActions.jsx` and `OrdersPage.jsx` before explicitly confirming that `changePickupTime` (`updateDoc`) and `cancelOrder` (`deleteDoc`) were saved at the bottom of `src/services/orders.js`, so I verified and added both exports to `orders.js` before testing.