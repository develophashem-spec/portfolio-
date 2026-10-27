# FitStore – Men & Women e-commerce (Next.js + Node.js + MongoDB)

Features: men/women catalog, product pages, size selector with a height/weight "find your fit" recommender, cart, and online ordering (stored in MongoDB; prices are verified server-side).

```bash
cd store
npm install
cp .env.example .env.local   # set MONGODB_URI
npm run seed                 # load sample products
npm run dev                  # http://localhost:3000
```

API: `GET /api/products?category=men|women`, `GET /api/products/:id`, `POST /api/orders`.
