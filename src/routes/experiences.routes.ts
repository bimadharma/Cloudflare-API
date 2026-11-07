import { Hono } from 'hono'
import type { Bindings } from '../types/env'
import { getExperiences } from '../services/experience.service'

const experiencesRoutes = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const experiences = await getExperiences(c.env.portfolio_db)

    return c.json({
      success: true,
      data: experiences,
    }, 200)
  })

export default experiencesRoutes