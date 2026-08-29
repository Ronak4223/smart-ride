export type BillingCycle = 'monthly' | 'yearly';

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string | null;
  priceSuffix: string | null;
  features: string[];
  popular: boolean;
  ctaLabel: string;
  ctaVariant: 'solid' | 'outline';
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Smart Basic',
    description: 'For occasional recurring commuters',
    monthlyPrice: '₹2,999',
    yearlyPrice: '₹29,990',
    priceSuffix: null,
    features: [
      '20 rides',
      'Scheduled pickup',
      'Standard vehicle',
      'Driver tracking',
      'Customer support',
    ],
    popular: false,
    ctaLabel: 'Choose Basic',
    ctaVariant: 'outline',
  },
  {
    id: 'plus',
    name: 'Smart Plus',
    description: 'For regular commuters',
    monthlyPrice: '₹4,499',
    yearlyPrice: '₹44,990',
    priceSuffix: null,
    features: [
      '40 rides',
      'Priority scheduling',
      'Premium vehicle',
      'Live tracking',
      'Free rescheduling',
    ],
    popular: true,
    ctaLabel: 'Choose Plus',
    ctaVariant: 'solid',
  },
  {
    id: 'pro',
    name: 'Smart Pro',
    description: 'For daily professionals',
    monthlyPrice: '₹6,499',
    yearlyPrice: '₹64,990',
    priceSuffix: null,
    features: [
      'Unlimited scheduled rides',
      'Premium vehicles',
      'Priority support',
      'Flexible pickup',
      'Dedicated assistance',
    ],
    popular: false,
    ctaLabel: 'Choose Pro',
    ctaVariant: 'outline',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'For teams and businesses',
    monthlyPrice: 'Custom',
    yearlyPrice: null,
    priceSuffix: null,
    features: [
      'Team route management',
      'Centralized billing',
      'Dedicated support',
      'Custom scheduling',
      'Employee safety tracking',
    ],
    popular: false,
    ctaLabel: 'Contact Sales',
    ctaVariant: 'outline',
  },
];
