import type { ProjectData } from '../types/portofolio'

type ProjectRow = {
  id: number
  slug: string
  title: string
  short_description: string
  full_description: string
  image_url: string | null
}

type TechnologyRow = {
  project_id: number
  technology: string
}

type FeatureRow = {
  project_id: number
  feature: string
}

type ProjectLinkRow = {
  project_id: number
  document_url: string | null
  github_url: string | null
  live_url: string | null
}

export const getProjects = async (
  db: D1Database
): Promise<ProjectData[]> => {
  const projects = await db
    .prepare(`
      SELECT
        id,
        slug,
        title,
        short_description,
        full_description,
        image_url
      FROM projects
      ORDER BY sort_order ASC, id ASC
    `)
    .all<ProjectRow>()

  const technologies = await db
    .prepare(`
      SELECT project_id, technology
      FROM project_technologies
      ORDER BY sort_order ASC, id ASC
    `)
    .all<TechnologyRow>()

  const features = await db
    .prepare(`
      SELECT project_id, feature
      FROM project_features
      ORDER BY sort_order ASC, id ASC
    `)
    .all<FeatureRow>()

  const links = await db
    .prepare(`
      SELECT project_id, document_url, github_url, live_url
      FROM project_links
    `)
    .all<ProjectLinkRow>()

  return projects.results.map((project) => {
    const projectLinks = links.results.find(
      (link) => link.project_id === project.id
    )

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      short_description: project.short_description,
      full_description: project.full_description,
      tech_stack: technologies.results
        .filter((item) => item.project_id === project.id)
        .map((item) => item.technology),
      key_features: features.results
        .filter((item) => item.project_id === project.id)
        .map((item) => item.feature),
      image_url: project.image_url,
      links: {
        document: projectLinks?.document_url ?? null,
        github: projectLinks?.github_url ?? null,
        live: projectLinks?.live_url ?? null,
      },
    }
  })
}