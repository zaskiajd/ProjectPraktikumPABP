import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-6xl font-black text-gray-200 mb-4">404</p>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Halaman tidak ditemukan</h2>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
        Kembali ke Home
      </Link>
    </div>
  );
}