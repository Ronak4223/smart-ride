import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonVariant } from './SrButton';
import { useMagnetic } from '../../lib/useMagnetic';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  strength?: number;
}

/**
 * A Button with cursor-attraction applied — reserved for the one or two
 * primary CTAs per section that deserve the extra weight, not every button
 * on the page (that would just make the whole site feel twitchy).
 */
export function MagneticButton({ variant = 'solid', children, strength = 0.3, ...rest }: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <Button as="a" variant={variant} ref={ref} {...rest}>
      {children}
    </Button>
  );
}
