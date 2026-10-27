'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';

export default function Header() {
  const { items } = useCart();
  const n = items.reduce((s, i) => s + i.qty, 0);
  return (
    <header className="header">
      <Link href="/" className="logo">FIT<span>STORE</span></Link>
      <nav>
        <Link href="/?category=men">Men</Link>
        <Link href="/?category=women">Women</Link>
        <Link href="/cart">Cart ({n})</Link>
      </nav>
    </header>
  );
}
