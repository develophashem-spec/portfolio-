import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import AddToCart from '@/components/AddToCart';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await Product.findById(params.id).lean();
  if (!doc) notFound();
  const p = JSON.parse(JSON.stringify(doc));
  return (
    <div className="detail">
      <img src={p.image} alt={p.name} />
      <div>
        <h1>{p.name}</h1>
        <h2>${p.price}</h2>
        <p>{p.description}</p>
        <AddToCart product={p} />
      </div>
    </div>
  );
}
