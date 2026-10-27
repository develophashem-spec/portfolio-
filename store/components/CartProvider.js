'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {}
  }, []);
  const save = (n) => { setItems(n); localStorage.setItem('cart', JSON.stringify(n)); };
  const add = (p, size) => {
    const i = items.findIndex((x) => x.product === p._id && x.size === size);
    if (i >= 0) save(items.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x)));
    else save([...items, { product: p._id, name: p.name, price: p.price, size, qty: 1 }]);
  };
  const remove = (i) => save(items.filter((_, j) => j !== i));
  const clear = () => save([]);
  return <Ctx.Provider value={{ items, add, remove, clear }}>{children}</Ctx.Provider>;
}
