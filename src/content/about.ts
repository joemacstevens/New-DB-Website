import heroBackground from '../assets/background.svg?url';
import donSomervilleImage from '../assets/coaches/personal-training-don-somerville.png?url';
import joeButtaImage from '../assets/coaches/personal-training-joe-butta.png?url';
import glendaOrtizImage from '../assets/coaches/personal-training-glenda-ortiz.png?url';

export type Pillar = {
  title: string;
  description: string;
  icon?: string;
};

export type FacilityMedia = {
  id: string;
  mediaType: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  priority: 'hero' | 'medium' | 'small';
  poster?: string;
  cta?: {
    label: string;
    href: string;
    dataCta?: string;
  };
};

export type EquipmentFeature = {
  title: string;
  description: string;
  bullets: string[];
  image: string;
  theme: 'light' | 'dark';
  cta?: {
    label: string;
    href: string;
    dataCta: string;
  };
};

export type CommunityHighlight = {
  id: string;
  image: string;
  alt: string;
  quote: string;
  author: string;
  accent?: string;
};

export type AboutTestimonial = {
  quote: string;
  author: string;
  result?: string;
};

export const heroContent = {
  eyebrow: 'What Makes Us Different',
  heading: 'Not a gym. A training ground.',
  subheading: 'Discipline. Desire. Dedication. Walk in with goals. Walk out with proof.',
  background: heroBackground,
};

export const pillars: Pillar[] = [
  {
    title: 'Coaching',
    description: 'We don’t count reps. We build athletes with accountability, data, and day-one intensity.',
    icon: '🥊',
  },
  {
    title: 'Standards',
    description: 'Progress is earned. Programs adapt weekly, check-ins stay honest, and excuses never pass the door.',
    icon: '📈',
  },
  {
    title: 'Community',
    description: 'Different Breed is family. Members push together, spot each other, and show up when it counts.',
    icon: '🤝',
  },
];

export const facilityMedia: FacilityMedia[] = [
  {
    id: 'ring',
    mediaType: 'image',
    src: heroBackground,
    alt: 'Competition ring inside Different Breed facility.',
    caption: 'Competition-ready ring with pro coaching on deck.',
    priority: 'hero',
  },
  {
    id: 'turf',
    mediaType: 'image',
    src: heroBackground,
    alt: 'Turf lane for agility and sled work.',
    caption: '40-yard turf lane for speed, sleds, and agility resets.',
    priority: 'medium',
  },
  {
    id: 'bag-wall',
    mediaType: 'image',
    src: heroBackground,
    alt: 'Heavy bag wall lined with trainers and fighters.',
    caption: 'Bag wall packed every night with fighters and first-timers.',
    priority: 'medium',
  },
  {
    id: 'recovery',
    mediaType: 'image',
    src: heroBackground,
    alt: 'Recovery lounge area with mobility tools.',
    caption: 'Recovery lounge stocked with mobility tools and cold therapy.',
    priority: 'small',
  },
  {
    id: 'tour-video',
    mediaType: 'image',
    src: heroBackground,
    alt: 'Facility walkthrough preview still.',
    caption: 'Watch the walkthrough to feel the energy before day one.',
    priority: 'small',
    cta: {
      label: 'Watch Facility Tour',
      href: '/preview',
      dataCta: 'about-facility-tour',
    },
  },
];

export const equipmentFeatures: EquipmentFeature[] = [
  {
    title: 'InBody 380 Lab',
    description: 'Track muscle, fat, and hydration before every training block.',
    bullets: ['Full-body scan in 45 seconds', 'Baseline + monthly reassessments', 'Data-backed goal reviews'],
    image: heroBackground,
    theme: 'dark',
    cta: {
      label: 'See Personal Training',
      href: '/personal-training',
      dataCta: 'about-equipment-inbody',
    },
  },
  {
    title: 'Competition Ring',
    description: 'Built for sparring, discipline drills, and fight camp prep.',
    bullets: ['Regulation size', 'Coach-led sparring IQ sessions', 'Real-time film review'],
    image: heroBackground,
    theme: 'light',
  },
  {
    title: 'Strength Zone',
    description: 'Heavy iron, Eleiko platforms, and programming that scales.',
    bullets: ['Progressive overload protocols', 'Coach-assisted max testing', 'Olympic + power templates'],
    image: heroBackground,
    theme: 'dark',
  },
  {
    title: 'Conditioning Arsenal',
    description: 'Sleds, assault runners, SkiErgs, and a relentless timer.',
    bullets: ['Interval conditioning blocks', 'Team challenges every Friday', 'Low-impact recovery options'],
    image: heroBackground,
    theme: 'light',
  },
  {
    title: 'Recovery Lounge',
    description: 'Mobility tools, compression, and coaching to reset properly.',
    bullets: ['Guided stretch protocols', 'Cold + heat therapy', 'Coach-built recovery homework'],
    image: heroBackground,
    theme: 'dark',
  },
];

export const communityHighlights: CommunityHighlight[] = [
  {
    id: 'family',
    image: donSomervilleImage,
    alt: 'Coach Don celebrating with members after a session.',
    quote: '“Once you’re here, you’re family. We celebrate every win together.”',
    author: 'Coach Don',
    accent: 'Community Captain',
  },
  {
    id: 'transformation',
    image: glendaOrtizImage,
    alt: 'Strength session underway with Coach Glenda.',
    quote: '“The energy in this room is unmatched. They know your name and your goals.”',
    author: 'Glenda O.',
  },
  {
    id: 'parents',
    image: joeButtaImage,
    alt: 'Coach Joe teaching youth athletes proper form.',
    quote: '“My son found confidence here. Coaches check in on school and life, not just reps.”',
    author: 'Parent Testimonial',
  },
];

export const aboutTestimonials: AboutTestimonial[] = [
  {
    quote: 'Six months in and I’ve dropped 18 pounds, added serious power, and finally love training again.',
    author: 'Rashad T.',
    result: '–18 lbs · +70 lb trap bar pull',
  },
  {
    quote: 'Different Breed pushes you past comfort, but you’re never alone. This crew genuinely cares.',
    author: 'Meghan L.',
  },
  {
    quote: 'They train pros and youth with the same intensity. Discipline shows up on report cards, too.',
    author: 'Coach Rivera',
  },
];
