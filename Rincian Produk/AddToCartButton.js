// app/products/[id]/AddToCartButton.js
'use client';
import { useState } from 'react';
import useCartStore from '@/store/cartStore';

export default function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Jumlah:</label>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">−</button>
          <span className="px-4 py-2 font-semibold">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">+</button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
          added ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
        }`}
      >
        {added ? '✓ Berhasil ditambahkan ke Cart!' : '🛒 Tambah ke Cart'}
      </button>
    </div>
  );
}