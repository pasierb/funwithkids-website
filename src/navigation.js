import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About us',
      href: getPermalink('/about'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/pasierb/funwithkids-website' },
  ],
  footNote: `
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://www.linkedin.com/in/mpasierbski/"> Michal Pasierbski</a> · All rights reserved.
  `,
};
