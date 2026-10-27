import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(_req, { params }) {
  if (!mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await connectDB();
  const p = await Product.findById(params.id).lean();
  return p ? NextResponse.json(p) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
