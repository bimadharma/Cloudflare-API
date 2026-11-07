import { Hono } from 'hono'
import type { Bindings } from '../types/env'
import { getCertifications } from '../services/certification.service'

const certificationsRoutes = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const certifications = await getCertifications(c.env.portfolio_db)

    return c.json({
      success: true,
      data: certifications,
    }, 200)
  })

export default certificationsRoutes
