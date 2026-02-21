// app/cart/page.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Cart masih kosong</h2>
        <p className="text-gray-500 mb-6">Yuk belanja sekarang!</p>
        <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
          Hapus Semua
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex gap-4">
              <div className="relative w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0">
                <Image src={item.thumbnail} alt={item.title} fill className="object-contain p-1" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-1">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 bg-gray-100 rounded-full hover:bg-gray-200 font-bold">−</button>
                  <span className="w-8 text-center font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 bg-gray-100 rounded-full hover:bg-gray-200 font-bold">+</button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xl">×</button>
                <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} item)</span>
              <span className="font-semibold">${getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkir</span>
              <span className="text-green-600 font-semibold">Gratis</span>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-blue-600">${getTotalPrice()}</span>
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition active:scale-95">
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}