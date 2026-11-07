import { Hono } from 'hono'
import type { Bindings } from '../types/env'
import { getSkills } from '../services/skill.service'

const skillsRoutes = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const skills = await getSkills(c.env.portfolio_db)

    return c.json({
      success: true,
      data: skills,
    }, 200)
  })

export default skillsRoutes