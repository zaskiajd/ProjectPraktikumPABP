// components/ProductCard.js
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"  // ← Lazy loading!
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-blue-500 uppercase font-semibold">{product.category}</span>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 hover:text-blue-600 line-clamp-2">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-500">{product.rating}</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}