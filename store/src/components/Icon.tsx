import { HTMLAttributes, PropsWithChildren } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {}

export const Icon = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <span
      {...props}
      className={['material-symbols-outlined', props.className].join(' ')}>
      {children}
    </span>
  );
};
