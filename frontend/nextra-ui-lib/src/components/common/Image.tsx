import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

export default function Image({ src, alt, fallback, className, ...rest }: Props) {
  const [err, setErr] = React.useState(false);
  const display = err || !src ? fallback ?? '/placeholder.png' : src;
  return <img src={display} alt={alt} className={className} onError={() => setErr(true)} {...rest} />;
}
