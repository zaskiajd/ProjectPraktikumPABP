// app/products/[id]/page.js
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

// Generate semua halaman produk saat build time (SSG)
export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=30&select=id');
  const data = await res.json();
  return data.products.map(p => ({ id: String(p.id) }));
}

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 } // ISR: revalidate tiap 1 jam
  });
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

// Dynamic metadata untuk SEO
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: `${product.title} - ShopNext`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      {/* SSG Badge */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <p className="text-purple-700 font-semibold">🏗️ Halaman ini menggunakan: <span className="bg-purple-100 px-2 py-0.5 rounded">SSG + ISR (Static Site Generation + Incremental Static Regeneration)</span></p>
        <p className="text-purple-600 text-sm mt-1">Halaman produk di-generate secara statis saat build time menggunakan generateStaticParams, dan di-regenerate setiap 1 jam (ISR).</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <div className="relative w-full h-80">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-contain"
                priority // ← Prioritas load karena above-the-fold
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8">
            <span className="text-sm text-blue-500 uppercase font-semibold tracking-wide">{product.category}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-400 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">-{product.discountPercentage}%</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Rating</p>
                <p className="font-semibold">⭐ {product.rating} / 5</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Stok</p>
                <p className="font-semibold">{product.stock} unit</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Brand</p>
                <p className="font-semibold">{product.brand || '-'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">SKU</p>
                <p className="font-semibold">{product.sku || '-'}</p>
              </div>
            </div>

            {/* Client Component untuk interaksi */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}