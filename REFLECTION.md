# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
    building a UI imperatively change the UI step-by-step while building UI declaratively handles the update automatically and tell react how the final UI should look like.
2. Why must a component name start with a capital letter?
    Signal React that the name represents a custom component rather than a standard HTML element.
3. What does a fragment <>...</> do, and why not just use a <div>?
    Fragment group elements together without adding extra nodes to DOM that prevent unnecessary wrapper element from breaking CSS layouts.
4. Name one benefit of splitting the UI into small components.
    It increase code reusability across the application.

## Week 6

### M2 Prep Questions

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page.Name the functions   in your own code that run, and say why you never call setOrders yourself.
    -Clicking Place order calls `placeOrders(user, cart, details)` in `src/services/orders.js`, which uses `writeBatch(db)` to write new documents directly into the top-level `orders` collection in Cloud Firestore. 
    -`OrdersPage.jsx` does not hold local order state but instead, it reads from `useMyOrders()`, which opens a real-time `onSnapshot` listener (`subscribeToMyOrders`) filtered by `where('studentUid', '==', uid)`. 
    -Whenever Firestore commits the new order document, `onSnapshot` fires automatically and passes the updated snapshot array to `setOrders(data)` inside the hook, updating `/orders` live without manual state syncing.

2. Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?
    -Storing `orders` at the top level allows a single `where('studentUid', '==', uid)` query to retrieve all of a student's orders across every vendor at once, rather than querying inside each vendor's subcollection separately. 
    -Copying `vendorName`, item `name`, and item `price` into each order document preserves an accurate historical receipt—if a vendor later edits a menu price or renames an item in Firestore, past orders still reflect the exact price the student paid at checkout.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.
   - Firestore path & fields Saved inside each order document at `orders/{orderId}` within the `items` array (`items[].note`, alongside `itemId`, `name`, `price`, and `qty`).
   - In `src/pages/OrdersPage.jsx`, inside `order.items?.map((i) => ...)`:
     ```jsx
     {i.note && <p className="muted">Note: &ldquo;{i.note}&rdquo;</p>}
     ```

### What I Built & Debugged as of week 6
- Migrated vendors, menus, and orders from static JSON and `localStorage` to Cloud Firestore (`asia-southeast1`) with live `onSnapshot` subscriptions, `updateDoc` for changing pickup times while `status === 'Received'`, and `deleteDoc` for order cancellation.
- Seeded my own shop (`2419467-nasi-kukus` — Nasi Kukus) and verified real-time price updates in the browser when editing menu documents in the Firebase Console.
- Fixed a Vite import error when wiring `OrdersPage.jsx` before creating `OrderActions.jsx`, and resolved a syntax error caused by pasting `.status-steps` CSS rules into `OrderStatus.jsx` instead of `src/index.css`.