// app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'ShopNext - Web Platform App',
  description: 'Tugas Web Platform - Next.js SSR, SSG, CSR Demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center text-gray-400 text-sm py-6 mt-10 border-t">
          © 2026 ShopNext — Tugas Web Platform
        </footer>
      </body>
    </html>
  );
}