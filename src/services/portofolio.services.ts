type Profile = {
  id: number
  name: string
  description: string
  email: string
  cv_url: string | null
  photo_url: string | null
}

export const getProfile = async (db: D1Database) => {
  const profile = await db
    .prepare('SELECT * FROM profile WHERE id = ?')
    .bind(1)
    .first<Profile>()

  return profile
}