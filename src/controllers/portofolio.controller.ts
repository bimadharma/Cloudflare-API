import type { Context } from 'hono'
import type { Bindings } from '../types/env'
import { getProfile } from '../services/portofolio.services'

export const getPortfolioController = async (
  c: Context<{ Bindings: Bindings }>
) => {
  const profile = await getProfile(c.env.portfolio_db)

  if (!profile) {
    return c.json({
      success: false,
      message: 'Profile data not found',
    }, 404)
  }

  return c.json({
    success: true,
    data: {
      profile,
    },
  })
}