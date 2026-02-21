'use client';
export default function Error({ error, reset }) {
  return (
    <div className="text-center py-24">
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Terjadi Kesalahan</h2>
      <p className="text-gray-500 mb-6">{error.message}</p>
      <button onClick={reset} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
        Coba Lagi
      </button>
    </div>
  );
}