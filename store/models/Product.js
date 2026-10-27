import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['men', 'women'], required: true },
  price: { type: Number, required: true, min: 0 },
  image: String,
  description: String,
  sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
