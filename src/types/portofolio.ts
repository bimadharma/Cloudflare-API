
export interface Hero {
  name: string
  roles: string[]
  description: string
}

export interface Portfolio {
  hero: Hero
  skills: unknown[]
  experience: unknown[]
  projects: unknown[]
  education: unknown[]
  contact: Record<string, unknown>
}
