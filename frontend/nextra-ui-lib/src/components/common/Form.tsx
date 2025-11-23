import React from 'react';

type Props = {
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
};

export default function Form({ onSubmit, children, className }: Readonly<Props>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className={className}
    >
      {children}
    </form>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} className={`${props.className ?? 'px-2 py-1 border rounded'}`} {...props} />;
});

