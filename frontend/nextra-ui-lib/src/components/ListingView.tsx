import React from 'react';

export type ListingItem = {
  id: string;
  title?: string;
  subtitle?: string;
  image?: string | null;
  [k: string]: any;
};

export type ListingViewProps<T extends ListingItem> = {
  items: T[];
  loading?: boolean;
  onRefresh?: () => void;
  renderItem?: (item: T) => React.ReactNode; // if provided, used instead of default card
  keyExtractor?: (item: T) => string;
  className?: string;
  columns?: number; // how many columns for grid layout
};

export function ListingView<T extends ListingItem>({
  items,
  loading = false,
  onRefresh,
  renderItem,
  keyExtractor = (i) => i.id,
  className,
  columns = 3,
}: ListingViewProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No items.
        {onRefresh && (
          <div className="mt-4">
            <button onClick={onRefresh} className="px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
          </div>
        )}
      </div>
    );
  }

  const gridCols = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`;

  return (
    <div className={className}>
      <div className={`grid gap-4 ${gridCols}`}>
        {items.map((item) => (
          <div key={keyExtractor(item)}>
            {renderItem ? (
              renderItem(item)
            ) : (
              <article className="border rounded shadow-sm overflow-hidden bg-white">
                {item.image ? (
                  <img src={item.image} alt={item.title || ''} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.subtitle && <p className="text-sm text-gray-600">{item.subtitle}</p>}
                </div>
              </article>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingView;
