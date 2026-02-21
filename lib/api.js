// lib/api.js
const BASE_URL = 'https://dummyjson.com';

export async function getAllProducts(limit = 20, skip = 0) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 3600 } // cache 1 jam untuk SSG/ISR
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function getAllProductIds() {
  const res = await fetch(`${BASE_URL}/products?limit=100&select=id`);
  const data = await res.json();
  return data.products.map(p => p.id);
}

export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!res.ok) throw new Error('Failed to search');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 } // cache 24 jam
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, {
    cache: 'no-store' // SSR — selalu fresh
  });
  if (!res.ok) throw new Error('Failed to fetch by category');
  return res.json();
}