import React,  {type ImgHTMLAttributes, memo } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean;
}

/**
 * Small, performant Image component.
 * - Uses native loading="lazy"
 * - Passes through srcSet if provided
 * - Memoized to avoid unnecessary re-renders
 */
export const Image: React.FC<ImageProps> = memo(({ src, alt, loading, lazy = true, className = '', width, height, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading ?? (lazy ? 'lazy' : 'eager')}
      decoding="async"
      width={width as any}
      height={height as any}
      className={className}
      {...rest}
    />
  );
});

Image.displayName = 'Image';
