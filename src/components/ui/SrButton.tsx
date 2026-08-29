import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'amber' | 'navy-outline';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  amber: 'btn-amber',
  'navy-outline': 'btn-navy-outline',
};

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: 'a';
  variant?: ButtonVariant;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as: 'button';
  variant?: ButtonVariant;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/**
 * The single button primitive for the app. Every CTA should render through
 * this rather than a one-off <a className="btn-whatever">, so variant
 * styling and hover behavior live in exactly one place. Accepts a ref
 * (React 19 native ref-as-prop, no forwardRef needed) so callers can
 * attach behavior hooks like useMagnetic / useTilt.
 */
export function Button({ variant = 'solid', className, children, ...rest }: ButtonProps) {
  const cls = [VARIANT_CLASS[variant], className].filter(Boolean).join(' ');

  if (rest.as === 'button') {
    const { as: _as, ...buttonRest } = rest;
    void _as;
    return (
      <button className={cls} {...buttonRest}>
        {children}
      </button>
    );
  }

  const { as: _as, ...linkRest } = rest as ButtonAsLinkProps;
  void _as;
  return (
    <a className={cls} {...linkRest}>
      {children}
    </a>
  );
}
