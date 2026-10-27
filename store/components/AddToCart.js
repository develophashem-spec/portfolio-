'use client';
import { useState } from 'react';
import { useCart } from './CartProvider';

const CHART = [
  { s: 'XS', h: '150–160 cm', w: '45–52 kg' },
  { s: 'S', h: '160–170 cm', w: '52–62 kg' },
  { s: 'M', h: '170–178 cm', w: '62–75 kg' },
  { s: 'L', h: '178–185 cm', w: '75–88 kg' },
  { s: 'XL', h: '185–195 cm', w: '88–100 kg' },
];

function recommend(h, w) {
  const hh = Number(h), ww = Number(w);
  if (!hh || !ww) return null;
  const idx = (v, cuts) => cuts.filter((c) => v >= c).length;
  const i = Math.max(idx(hh, [160, 170, 178, 185]), idx(ww, [52, 62, 75, 88]));
  return CHART[Math.min(i, CHART.length - 1)].s;
}

export default function AddToCart({ product }) {
  const { add } = useCart();
  const [size, setSize] = useState(null);
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [done, setDone] = useState(false);
  const rec = recommend(h, w);
  return (
    <>
      <div className="fit">
        <strong>Find your fit</strong>
        <input placeholder="Height (cm)" value={h} onChange={(e) => setH(e.target.value)} inputMode="numeric" />
        <input placeholder="Weight (kg)" value={w} onChange={(e) => setW(e.target.value)} inputMode="numeric" />
        {rec && product.sizes.includes(rec) && (
          <p>Recommended size: <button className="btn" onClick={() => setSize(rec)}>{rec}</button></p>
        )}
      </div>
      <div className="sizes">
        {product.sizes.map((s) => (
          <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>
        ))}
      </div>
      <button className="btn" disabled={!size} onClick={() => { add(product, size); setDone(true); }}>
        {size ? 'Add to cart' : 'Select a size'}
      </button>
      {done && <p>Added to cart ✔</p>}
    </>
  );
}
