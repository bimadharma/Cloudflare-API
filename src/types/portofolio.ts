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