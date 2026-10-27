import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req) {
  await connectDB();
  const category = new URL(req.url).searchParams.get('category');
  const filter = ['men', 'women'].includes(category) ? { category } : {};
  return NextResponse.json(await Product.find(filter).lean());
}
