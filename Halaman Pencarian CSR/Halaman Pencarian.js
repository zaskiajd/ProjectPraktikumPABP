// app/search/page.js
'use client';

import { useState, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // useCallback untuk memoize fungsi search
  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      setResults(data.products);
    } catch (err) {
      setError('Terjadi kesalahan: ' + err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Cari Produk</h1>

      {/* CSR Badge */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <p className="text-orange-700 font-semibold">🌐 Halaman ini menggunakan: <span className="bg-orange-100 px-2 py-0.5 rounded">CSR (Client-Side Rendering)</span></p>
        <p className="text-orange-600 text-sm mt-1">Pencarian dilakukan langsung dari browser pengguna menggunakan fetch API. Halaman tidak perlu reload — state dikelola dengan useState di sisi client.</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cari produk... (misal: laptop, phone, shirt)"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? 'Mencari...' : '🔍 Cari'}
        </button>
      </form>

      {/* States */}
      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          ❌ {error}
        </div>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-xl font-semibold">Produk tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci lain</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p className="text-gray-500 text-sm mb-4">Ditemukan <strong>{results.length}</strong> produk untuk "<strong>{query}</strong>"</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}