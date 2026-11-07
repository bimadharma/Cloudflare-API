export interface ProfileData {
  name: string
  description: string
  email: string
  roles: string[]
  assets: {
    cv_url: string | null
    photo_url: string | null
  }
  social_links: Record<string, string>
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ProfileSuccessResponse {
  success: true
  data: ProfileData
}

export interface ProfileNotFoundResponse {
  success: false
  message: string
}

export interface SkillsSuccessResponse {
  success: true
  data: SkillCategory[]
}

export interface ExperienceData {
  company: string
  position: string
  start_date: string
  end_date: string | null
  location: string | null
  logo: string | null
  description: string[]
}

export interface ProjectData {
  id: number
  slug: string
  title: string
  short_description: string
  full_description: string
  tech_stack: string[]
  key_features: string[]
  image_url: string | null
  links: {
    document: string | null
    github: string | null
    live: string | null
  }
}

export interface CertificationData {
  id: number
  title: string
  issuer: string
  date: string
  image_url: string | null
}