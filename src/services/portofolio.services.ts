import type { ProfileData } from '../types/portofolio'

type Profile = {
  id: number
  name: string
  description: string
  email: string
  cv_url: string | null
  photo_url: string | null
}

type ProfileRole = {
  role: string
}

type SocialLink = {
  platform: string
  url: string
}

export const getProfile = async (
  db: D1Database
): Promise<ProfileData | null> => {
  const profile = await db
    .prepare('SELECT * FROM profile WHERE id = ?')
    .bind(1)
    .first<Profile>()

  if (!profile) {
    return null
  }

  const rolesResult = await db
    .prepare('SELECT role FROM profile_roles WHERE profile_id = ? ORDER BY sort_order ASC')
    .bind(1)
    .all<ProfileRole>()

  const linksResult = await db
    .prepare('SELECT platform, url FROM social_links WHERE profile_id = ? ORDER BY sort_order ASC')
    .bind(1)
    .all<SocialLink>()

  const socialLinks = Object.fromEntries(
    linksResult.results.map((link) => [link.platform, link.url])
  )

  return {
    name: profile.name,
    description: profile.description,
    email: profile.email,
    roles: rolesResult.results.map((item) => item.role),
    assets: {
      cv_url: profile.cv_url,
      photo_url: profile.photo_url,
    },
    social_links: socialLinks,
  }
}