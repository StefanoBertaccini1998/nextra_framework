import React, { useEffect, useState } from 'react';
import ListingView, { ListingItem } from '../components/ListingView';
import useAuth from '../hooks/useAuth';
import { api } from '../services/api';

type PropertyDto = {
  id: number | string;
  name?: string;
  address?: string;
  price?: number;
  description?: string;
  // owner/category fields may exist
};

export default function PropertiesListExample() {
  const { token, isAuthenticated, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ListingItem[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Ensure api base url is set (fallback to localhost)
    // Vite exposes env via import.meta.env; cast to any to avoid TS issues in library context
    const base = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';
    api.setBaseUrl(base);
  }, []);

  const fetchProperties = async (p = 0) => {
    setLoading(true);
    try {
      // Backend returns ApiResponse<PagedResponse<Property>>
      const res = await api.get<any>('/api/properties', { query: { page: p, size: 12 } });
      // normalize: support ApiResponse wrapper
      const payload = res?.data ?? res;
      const content: PropertyDto[] = payload?.content ?? payload ?? [];

      const mapped = content.map((pr) => ({
        // spread original properties first, then override id/title/summary fields
        ...pr,
        id: String(pr.id),
        title: pr.name ?? pr.address ?? `#${pr.id}`,
        subtitle: pr.address ?? (pr.price ? `${pr.price} €` : undefined),
        image: (pr as any).imageUrl ?? null,
      })) as ListingItem[];

      setItems(mapped);
      setPage(payload?.page ?? p);
    } catch (err) {
      console.error('fetchProperties error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If authenticated, fetch; otherwise empty
    fetchProperties(0);
  }, [isAuthenticated]);

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const username = (fd.get('username') as string) || '';
    const password = (fd.get('password') as string) || '';

    try {
      await login({ username, password });
      // fetchProperties will run from isAuthenticated effect
    } catch (err: any) {
      alert('Login failed: ' + (err?.message ?? err));
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Properties Example</h2>

      {!isAuthenticated ? (
        <form onSubmit={doLogin} className="mb-6 max-w-sm">
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm">Username</label>
            <input id="username" name="username" className="w-full px-2 py-1 border rounded" />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm">Password</label>
            <input id="password" name="password" type="password" className="w-full px-2 py-1 border rounded" />
          </div>
          <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Login</button>
        </form>
      ) : (
        <div className="mb-4">
          <div>Authenticated (token: {token ? token.substr(0, 12) + '…' : '—'})</div>
          <div className="mt-2">
            <button onClick={() => logout()} className="px-3 py-2 bg-gray-200 rounded">Logout</button>
            <button onClick={() => fetchProperties(page)} className="ml-2 px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
          </div>
        </div>
      )}

      <ListingView items={items} loading={loading} onRefresh={() => fetchProperties(page)} columns={3} />
    </div>
  );
}
