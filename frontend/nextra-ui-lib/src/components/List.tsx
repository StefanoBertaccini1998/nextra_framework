import React from 'react';
import cn from 'classnames';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  className?: string;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vertical';
}

export const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  className,
  gap = 'md',
  direction = 'vertical'
}: ListProps<T>) => {
  const gapClasses = {
    none: '',
    sm: direction === 'vertical' ? 'gap-2' : 'gap-x-2',
    md: direction === 'vertical' ? 'gap-4' : 'gap-x-4',
    lg: direction === 'vertical' ? 'gap-6' : 'gap-x-6'
  };

  return (
    <div 
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        gapClasses[gap],
        className
      )}
    >
      {items.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default List;
