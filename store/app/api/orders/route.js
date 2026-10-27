import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { customer, items } = body || {};
  if (!customer?.name || !customer?.email || !customer?.address || !Array.isArray(items) || !items.length) {
    return NextResponse.json({ error: 'Missing customer details or items' }, { status: 400 });
  }
  await connectDB();
  const lines = [];
  let total = 0;
  for (const it of items) {
    const qty = Number(it.qty);
    if (!mongoose.isValidObjectId(it.product) || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return NextResponse.json({ error: 'Invalid item' }, { status: 400 });
    }
    const p = await Product.findById(it.product);
    if (!p || !p.sizes.includes(it.size)) return NextResponse.json({ error: 'Invalid product or size' }, { status: 400 });
    // price taken from the database, never from the client
    lines.push({ product: p._id, name: p.name, size: it.size, qty, price: p.price });
    total += p.price * qty;
  }
  const order = await Order.create({
    customer: { name: String(customer.name), email: String(customer.email), address: String(customer.address) },
    items: lines,
    total,
  });
  return NextResponse.json({ id: order._id, total }, { status: 201 });
}
