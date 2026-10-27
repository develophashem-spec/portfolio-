import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        size: { type: String, required: true },
        qty: { type: Number, min: 1, required: true },
        price: Number,
      },
    ],
    total: Number,
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
