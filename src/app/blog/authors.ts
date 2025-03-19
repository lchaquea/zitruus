export interface Author {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  image?: string;
}

export const authors: Author[] = [
  {
    id: 'default',
    name: 'Zitruus Team',
    role: 'Content Team',
    bio: 'The Zitruus team brings you the latest insights and updates.',
    website: 'https://zitruus.com/about',
    image: '/images/team/default-avatar.png'
  }
]; 