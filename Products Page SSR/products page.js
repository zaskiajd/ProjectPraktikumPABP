// app/products/page.js
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// SSR: cache: 'no-store' memaksa fetch ulang tiap request
async function getProducts(category, page = 1) {
  const limit = 12;
  const skip = (page - 1) * limit;
  let url = category
    ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url, { cache: 'no-store' }); // ← SSR!
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

async function getCategories() {
  const res = await fetch('https://dummyjson.com/products/categories', {
    cache: 'no-store'
  });
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || '';
  const page = parseInt(searchParams?.page || '1');

  const [data, categories] = await Promise.all([
    getProducts(category, page),
    getCategories()
  ]);

  const totalPages = Math.ceil(data.total / 12);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Semua Produk</h1>

      {/* SSR Badge */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 font-semibold">⚡ Halaman ini menggunakan: <span className="bg-blue-100 px-2 py-0.5 rounded">SSR (Server-Side Rendering)</span></p>
        <p className="text-blue-600 text-sm mt-1">Data di-fetch dari server setiap kali halaman diakses. Data selalu fresh dan bisa merespons query parameter dinamis (kategori, halaman).</p>
        <p className="text-blue-500 text-xs mt-1">Timestamp render: {new Date().toLocaleString('id-ID')}</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/products" className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${!category ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}>
          Semua
        </Link>
        {categories.slice(0, 12).map(cat => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition capitalize ${category === cat.slug ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {data.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={`/products?${category ? `category=${category}&` : ''}page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium border transition ${
                p === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}