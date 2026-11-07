import { Hono } from 'hono'
import type { Bindings } from '../types/env'
import { getProfile } from '../services/portofolio.services'

const portofolioRoutes = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const profile = await getProfile(c.env.portfolio_db)

    if (!profile) {
      return c.json({
        success: false,
        message: 'Profile data not found',
      }, 404)
    }

    return c.json({
      success: true,
      data: profile,
    }, 200)
  })

export default portofolioRoutes