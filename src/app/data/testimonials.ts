import { CSSProperties } from 'react';

export interface Testimonial {
  id: number;
  imageSrc: string;
  name: string;
  role: string;
  testimonial: string;
  position: CSSProperties;
  label?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    imageSrc: '/assets/images/team-1.svg',
    name: 'Juan F.',
    role: 'Ops Lead',
    testimonial: "The hiring process was straightforward, and Zitruus team made sure everything was set up for success. I've been able to focus on my work without worrying about contracts or payments.",
    position: { position: 'absolute', top: '25%', left: '5%' },
    label: 'Click me'
  },
  {
    id: 2,
    imageSrc: '/assets/images/team-2.svg',
    name: 'Natalia A.',
    role: 'Paid Media Specialist',
    testimonial: "Working with Zitruus has been a game-changer. The onboarding was smooth, and I've found a perfect balance between challenging work and great compensation.",
    position: { position: 'absolute', top: '45%', right: '10%' }
  },
  {
    id: 3,
    imageSrc: '/assets/images/team-3.svg',
    name: 'Carlos M.',
    role: 'Senior Developer',
    testimonial: "I was skeptical about remote work, but Zitruus made the transition seamless. Their support team is always there when I need them, and the work-life balance is fantastic.",
    position: { position: 'absolute', bottom: '15%', left: '20%' }
  },
  {
    id: 4,
    imageSrc: '/assets/images/team-5.svg',
    name: 'Juan C.',
    role: 'Frontend Developer',
    testimonial: 'Working with a U.S. company through Zitruus has been a great experience. Everything was clear from the start, and I feel truly valued in my role.',
    position: { top: '85%', right: '15%' },
    label: 'Click me'
  },
  {
    id: 5,
    imageSrc: '/assets/images/team-6.svg',
    name: 'Nicolás G.',
    role: 'Lead Designer',
    testimonial: 'The team I work with is fantastic, and the job fits exactly what I was looking for. Zitruus made it easy to get started with a company that aligns with my skills.',
    position: { top: '70%', right: '12%' },
    label: 'Click me'
  },
  {
    id: 6,
    imageSrc: '/assets/images/team-7.svg',
    name: 'Nicolás G.',
    role: 'Lead Designer',
    testimonial: 'I like that Zitruus works with companies that truly invest in their teams. The experience has been positive, and I feel supported in my role.',
    position: { bottom: '0%', left: '12%' },
    label: 'Click me'
  },
  {
    id: 7,
    imageSrc: '/assets/images/team-8.svg',
    name: 'Natalia A.',
    role: 'Paid Media Specialist',
    testimonial: "I've always wanted to work with international teams, and Zitruus made that possible. The role matches what I was looking for, and the onboarding was simple.",
    position: { top: '30%', right: '6%' },
    label: 'Click me'
  },
  {
    id: 8,
    imageSrc: '/assets/images/team-9.svg',
    name: 'Laura V.',
    role: 'Executive Assistant',
    testimonial: 'I like that Zitruus takes care of all the details. Payroll is always on time, and the transition into my new role was smooth from day one.',
    position: { bottom: '25%', left: '10%' },
    label: 'Click me'
  },
  {
    id: 9,
    imageSrc: '/assets/images/team-10.svg',
    name: 'Juan F.',
    role: 'Ops Lead',
    testimonial: 'I was looking for a role that offered stability and growth, and Zitruus helped me find exactly that. The team I joined has been as well a cultural fit.',
    position: { top: '65%', right: '8%' },
    label: 'Click me'
  },
  {
    id: 10,
    imageSrc: '/assets/images/team-11.svg',
    name: 'Juan C.',
    role: 'Frontend Developer',
    testimonial: "The whole process felt professional and well-organized. As an engineer, I've worked remotely before, but this experience has been by far the most seamless.",
    position: { bottom: '10%', left: '15%' },
    label: 'Click me'
  },
  {
    id: 11,
    imageSrc: '/assets/images/team-12.svg',
    name: 'Juan F.',
    role: 'Ops Lead',
    testimonial: 'If you are thinking about working with Zitruus, do it. Everything was clear from the beginning. The interview process, the job offer, and the onboarding process were structured and professional.',
    position: { top: '50%', left: '23%' },
    label: 'Click me'
  },
  {
    id: 12,
    imageSrc: '/assets/images/team-1.svg',
    name: 'Juan F.',
    role: 'Ops Lead',
    testimonial: "The hiring process was straightforward, and Zitruus team made sure everything was set up for success. I've been able to focus on my work without worrying about contracts or payments.",
    position: { bottom: '20%', right: '15%' },
    label: 'Click me'
  }
]; 