// Single source of truth for site-wide facts.
// Anything marked TODO must come from Jon — do not invent values.
export const site = {
  name: 'VonJay',
  tagline: 'Chicago, a touch of Nashville melting into Atlanta.',
  location: 'Smyrna, Georgia',
  domain: 'vonjaymusic.com',
  contactEmail: '', // TODO(jon): public booking/contact email
  storeUrl: 'https://vonjay.base44.app/',
  storeName: 'Von Jay Productions',
  socials: {
    soundcloud: 'https://soundcloud.com/vonjay-music',
    spotify: '', // TODO(jon)
    appleMusic: '', // TODO(jon)
    instagram: '', // TODO(jon)
    tiktok: '', // TODO(jon)
    youtube: '', // TODO(jon)
  },
} as const;

export const nav = [
  { href: '/music', label: 'Music' },
  { href: '/artists/vonjay', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
