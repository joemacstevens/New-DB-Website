export type InfoCard = {
  title: string;
  description: string;
  icon?: string;
};

export type Step = {
  number: number;
  title: string;
  description: string;
};

import aadamAliImage from '../assets/coaches/aadam-ali-personal-training.webp?url';
import donSomervilleImage from '../assets/coaches/personal-training-don-somerville.png?url';
import joeButtaImage from '../assets/coaches/personal-training-joe-butta.png?url';
import danielWilsonImage from '../assets/coaches/personal-training-daniel-wilson.webp?url';
import coachDredImage from '../assets/coaches/personal-training-coach-dred.webp?url';
import carlosAcevedoImage from '../assets/coaches/personal-training-carlos-acevdeo.webp?url';
import pabloGaryImage from '../assets/coaches/personal-training-pablo-gary.webp?url';
import glendaOrtizImage from '../assets/coaches/personal-training-glenda-ortiz.png?url';
import ricardoCastroImage from '../assets/coaches/personal-training-ricardo-castro.webp?url';
import coreyWhiteImage from '../assets/coaches/personal-training-corey-white.webp?url';
import matthewSorrentinoImage from '../assets/coaches/personal-training-matthew-sorrentino.png?url';
import michelleButtafuocoImage from '../assets/coaches/personal-training-michelle-buttafuoco.png?url';

export type CoachHighlight = {
  slug: string;
  name: string;
  headline: string;
  focusTags: string[];
  image: string;
  imageAlt: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  result?: string;
};

export const infoCards: InfoCard[] = [
  {
    title: 'Assessment',
    description: 'We measure, don’t guess. Your journey starts with a full InBody scan and movement review.',
    icon: '📊',
  },
  {
    title: 'Custom Plan',
    description: 'Your plan. Your pace. Coaches build training blocks around your goals, schedule, and recovery.',
    icon: '📝',
  },
  {
    title: 'Real Progress',
    description: 'We track what matters. Every phase ends with new numbers and strategy, not guesswork.',
    icon: '📈',
  },
];

export const steps: Step[] = [
  {
    number: 1,
    title: 'Assess',
    description: 'Start with facts, not feelings. We capture baseline scans and movement to map your starting point.',
  },
  {
    number: 2,
    title: 'Plan',
    description: 'Your goals. Your blueprint. We define training blocks, nutrition checkpoints, and accountability.',
  },
  {
    number: 3,
    title: 'Train',
    description: 'Work. Adjust. Repeat. Sessions stay adaptive so real life never derails progress.',
  },
  {
    number: 4,
    title: 'Track',
    description: 'Measure. Improve. Win. Every four weeks we rescan, review metrics, and update the plan.',
  },
];

export const coachHighlights: CoachHighlight[] = [
  {
    slug: 'don-somerville',
    name: 'Don Somerville',
    headline: 'Golden Gloves champ & mentor',
    focusTags: ['coaching', 'youth', 'championships'],
    image: donSomervilleImage,
    imageAlt: 'Coach Don Somerville working with an athlete',
  },
  {
    slug: 'joe-butta',
    name: 'Joe Butta',
    headline: 'Coach of pros & youth',
    focusTags: ['pros', 'youth', 'adaptive'],
    image: joeButtaImage,
    imageAlt: 'Coach Joe Butta training a client',
  },
  {
    slug: 'daniel-wilson',
    name: 'Daniel Wilson',
    headline: 'Holistic boxing & nutrition',
    focusTags: ['holistic', 'nutrition', 'strength'],
    image: danielWilsonImage,
    imageAlt: 'Coach Daniel Wilson coaching during a boxing session',
  },
  {
    slug: 'coach-dred',
    name: 'Coach D.R.E.D.',
    headline: 'Discipline-driven youth mentor',
    focusTags: ['youth', 'discipline', 'education'],
    image: coachDredImage,
    imageAlt: 'Coach D.R.E.D. mentoring youth boxers',
  },
  {
    slug: 'carlos-acevedo',
    name: 'Carlos Acevedo',
    headline: 'Mind-body transformation guide',
    focusTags: ['holistic', 'reiki', 'bilingual'],
    image: carlosAcevedoImage,
    imageAlt: 'Coach Carlos Acevedo smiling with a client',
  },
  {
    slug: 'pablo-gary',
    name: 'Pablo Gary',
    headline: 'Championship youth developer',
    focusTags: ['youth', 'champions', 'education'],
    image: pabloGaryImage,
    imageAlt: 'Coach Pablo Gary celebrating with young athletes',
  },
  {
    slug: 'glenda-ortiz',
    name: 'Glenda Ortiz',
    headline: 'Trailblazing strength builder',
    focusTags: ['strength', 'empowerment', 'recovery'],
    image: glendaOrtizImage,
    imageAlt: 'Coach Glenda Ortiz smiling in the training facility',
  },
  {
    slug: 'ricardo-castro',
    name: 'Ricardo Castro',
    headline: 'Sustainable strength strategist',
    focusTags: ['strength', 'fat-loss', 'nutrition'],
    image: ricardoCastroImage,
    imageAlt: 'Coach Ricardo Castro demonstrating training technique',
  },
  {
    slug: 'corey-white',
    name: 'Corey White',
    headline: 'Elite speed & agility coach',
    focusTags: ['speed', 'agility', 'strength'],
    image: coreyWhiteImage,
    imageAlt: 'Coach Corey White leading speed drills',
  },
  {
    slug: 'aadam-ali',
    name: 'Aadam Ali',
    headline: 'Hall of Fame youth coach',
    focusTags: ['youth', 'championships', 'confidence'],
    image: aadamAliImage,
    imageAlt: 'Coach Aadam Ali celebrating with boxing students',
  },
  {
    slug: 'matthew-sorrentino',
    name: 'Matthew Sorrentino',
    headline: 'Never give up conditioning',
    focusTags: ['strength', 'conditioning', 'hiit'],
    image: matthewSorrentinoImage,
    imageAlt: 'Coach Matthew Sorrentino coaching a conditioning class',
  },
  {
    slug: 'michelle-buttafuoco',
    name: 'Michelle Buttafuoco',
    headline: 'Supportive movement specialist',
    focusTags: ['mobility', 'personalized', 'supportive'],
    image: michelleButtafuocoImage,
    imageAlt: 'Coach Michelle Buttafuoco guiding a client through mobility work',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'I dropped 6% body fat in three months and finally understand how to maintain it.',
    author: 'Erica M.',
    result: '–6% body fat in 90 days',
  },
  {
    quote: 'The weekly check-ins and InBody scans keep me honest. My coach has a plan for every roadblock.',
    author: 'Marcus L.',
  },
  {
    quote: 'Different Breed made strength training feel approachable. I’m stronger, leaner, and have real data to prove it.',
    author: 'Syd B.',
  },
];

export const testimonialsCopyTodo =
  'TODO: Replace testimonials with final client quotes and imagery from marketing once approved.';
