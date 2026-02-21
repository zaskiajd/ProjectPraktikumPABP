// app/page.js
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getCategories } from '@/lib/api';

// SSG: tidak ada cache: 'no-store', jadi Next.js akan static generate
export default async function HomePage() {
  // Data diambil saat BUILD TIME (SSG)
  const [productsData, categories] = await Promise.all([
    getAllProducts(8),
    getCategories()
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to ShopNext</h1>
        <p className="text-blue-100 mb-6">Temukan produk terbaik dengan harga terbaik</p>
        <Link href="/products" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition">
          Lihat Semua Produk →
        </Link>
      </section>

      {/* Render Method Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <p className="text-green-700 font-semibold">🏗️ Halaman ini menggunakan: <span className="bg-green-100 px-2 py-0.5 rounded">SSG (Static Site Generation)</span></p>
        <p className="text-green-600 text-sm mt-1">Data produk dan kategori di-fetch saat build time, bukan saat request masuk. Halaman ini sangat cepat karena sudah di-pre-render!</p>
      </div>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kategori</h2>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 10).map(cat => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition capitalize"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Produk Unggulan</h2>
          <Link href="/products" className="text-blue-600 hover:underline text-sm">Lihat semua →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}