import { useEffect, useState } from 'react';
import { ListingView, api, useAuth } from '@nextra/ui-lib';

type PropertyDto = { id: number | string; name?: string; address?: string; price?: number; imageUrl?: string };
type ListingItemLocal = { id: string; title?: string; subtitle?: string; image?: string | null };

export default function PropertiesExample() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<ListingItemLocal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.setBaseUrl((import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080');
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get<any>('/api/properties', { query: { page: 0, size: 12 } });
        const payload = res?.data ?? res;
        const content: PropertyDto[] = payload?.content ?? payload ?? [];
        const mapped: ListingItemLocal[] = content.map((p) => ({ id: String(p.id), title: p.name ?? '', subtitle: p.address, image: p.imageUrl ?? null }));
        setItems(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated !== false) load();
  }, [isAuthenticated]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Properties (from UI lib)</h2>
      <ListingView items={items} loading={loading} columns={3} />
    </div>
  );
}
