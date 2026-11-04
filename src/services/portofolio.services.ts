
import type { Portfolio } from '../types/portofolio'

export const getPortfolio = (): Portfolio => {
  return {
    hero: {
      name: 'Bima Dharma Yahya',
      roles: ['Software Developer', 'Data Analyst'],
      description: 'Welcome to my personal portfolio.',
    },
    skills: [],
    experience: [],
    projects: [],
    education: [],
    contact: {},
  }
}
