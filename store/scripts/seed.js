const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitstore';
const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
  name: String, category: String, price: Number, image: String, description: String, sizes: [String],
}));

const img = (id) => `https://images.unsplash.com/${id}?w=600&q=80`;
const data = [
  { name: 'Classic Oxford Shirt', category: 'men', price: 49, image: img('photo-1596755094514-f87e34085b2c'), description: 'Crisp cotton shirt with a tailored fit.' },
  { name: 'Slim Fit Chinos', category: 'men', price: 59, image: img('photo-1473966968600-fa801b869a1a'), description: 'Stretch chinos for everyday style.' },
  { name: 'Leather Bomber Jacket', category: 'men', price: 149, image: img('photo-1551028719-00167b16eac5'), description: 'Statement jacket in soft leather.' },
  { name: 'Floral Summer Dress', category: 'women', price: 69, image: img('photo-1572804013309-59a88b7e92f1'), description: 'Lightweight flowing dress.' },
  { name: 'High-Waist Jeans', category: 'women', price: 64, image: img('photo-1541099649105-f69ad21f3246'), description: 'Flattering high-rise denim.' },
  { name: 'Wool Blend Coat', category: 'women', price: 129, image: img('photo-1539533018447-63fcce2678e3'), description: 'Warm, elegant winter coat.' },
];

mongoose.connect(uri).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(data.map((d) => ({ ...d, sizes: ['XS', 'S', 'M', 'L', 'XL'] })));
  console.log('Seeded', data.length, 'products');
  await mongoose.disconnect();
}).catch((e) => { console.error(e); process.exit(1); });
