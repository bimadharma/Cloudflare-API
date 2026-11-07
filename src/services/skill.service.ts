import type { SkillCategory } from '../types/portofolio'

type SkillItem = {
  id: number
  category_id: number
  name: string
}

type SkillCategoryRow = {
  id: number
  category: string
}

export const getSkills = async (
  db: D1Database
): Promise<SkillCategory[]> => {
  const categories = await db
    .prepare('SELECT id, category FROM skill_categories ORDER BY sort_order ASC')
    .all<SkillCategoryRow>()

  const skills = await db
    .prepare('SELECT id, category_id, name FROM skill_items ORDER BY sort_order ASC')
    .all<SkillItem>()

  return categories.results.map((category) => ({
    category: category.category,
    items: skills.results
      .filter((skill) => skill.category_id === category.id)
      .map((skill) => skill.name),
  }))
}