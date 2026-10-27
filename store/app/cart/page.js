'use client';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

export default function Cart() {
  const { items, remove, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [msg, setMsg] = useState('');
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  async function order(e) {
    e.preventDefault();
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: form,
        items: items.map(({ product, size, qty }) => ({ product, size, qty })),
      }),
    });
    const data = await res.json();
    if (res.ok) { clear(); setMsg(`Order placed! Reference: ${data.id}`); }
    else setMsg(data.error || 'Order failed');
  }

  return (
    <>
      <h1>Your cart</h1>
      {msg && <p>{msg}</p>}
      {items.map((i, idx) => (
        <div className="row" key={idx}>
          <span>{i.name} ({i.size}) × {i.qty}</span>
          <span>${i.price * i.qty} <button onClick={() => remove(idx)}>✕</button></span>
        </div>
      ))}
      {items.length > 0 && (
        <form onSubmit={order}>
          <h2>Total: ${total}</h2>
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea required placeholder="Delivery address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button className="btn">Place order</button>
        </form>
      )}
    </>
  );
}
