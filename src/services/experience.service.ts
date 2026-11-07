import type { ExperienceData } from '../types/portofolio'

type ExperienceRow = {
  id: number
  company: string
  position: string
  start_date: string
  end_date: string | null
  location: string | null
  logo: string | null
}

type ExperienceDescriptionRow = {
  experience_id: number
  description: string
}

export const getExperiences = async (
  db: D1Database
): Promise<ExperienceData[]> => {
  const experiences = await db
    .prepare(`
      SELECT
        id,
        company,
        position,
        start_date,
        end_date,
        location,
        logo
      FROM experiences
      ORDER BY sort_order ASC, id ASC
    `)
    .all<ExperienceRow>()

  const descriptions = await db
    .prepare(`
      SELECT
        experience_id,
        description
      FROM experience_descriptions
      ORDER BY sort_order ASC, id ASC
    `)
    .all<ExperienceDescriptionRow>()

  return experiences.results.map((experience) => ({
    company: experience.company,
    position: experience.position,
    start_date: experience.start_date,
    end_date: experience.end_date,
    location: experience.location,
    logo: experience.logo,
    description: descriptions.results
      .filter((item) => item.experience_id === experience.id)
      .map((item) => item.description),
  }))
}