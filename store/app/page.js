import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }) {
  const category = ['men', 'women'].includes(searchParams?.category) ? searchParams.category : null;
  let products = [];
  let error = null;
  try {
    await connectDB();
    products = JSON.parse(JSON.stringify(await Product.find(category ? { category } : {}).lean()));
  } catch (e) {
    error = 'Could not load products. Check MONGODB_URI and run npm run seed.';
  }
  return (
    <>
      <section className="hero">
        <h1>Style that fits you</h1>
        <p>Shop men&apos;s and women&apos;s fashion and order online.</p>
      </section>
      {error && <p>{error}</p>}
      <div className="grid">
        {products.map((p) => (
          <Link key={p._id} href={`/product/${p._id}`} className="card">
            <img src={p.image} alt={p.name} />
            <div><strong>{p.name}</strong><p>${p.price} · {p.category}</p></div>
          </Link>
        ))}
      </div>
    </>
  );
}
