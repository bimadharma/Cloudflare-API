import { Hono } from 'hono'
import type { Bindings } from '../types/env'
import { getProjects } from '../services/project.service'

const projectsRoutes = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const projects = await getProjects(c.env.portfolio_db)

    return c.json({
      success: true,
      data: projects,
    }, 200)
  })

export default projectsRoutes