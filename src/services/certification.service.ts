import type { CertificationData } from '../types/portofolio'

export const getCertifications = async (
  db: D1Database
): Promise<CertificationData[]> => {
  const certifications = await db
    .prepare(`
      SELECT
        id,
        title,
        issuer,
        date,
        image_url
      FROM certifications
      ORDER BY sort_order ASC, id ASC
    `)
    .all<CertificationData>()

  return certifications.results
}