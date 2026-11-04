
import type { Context } from 'hono'
import { getPortfolio } from '../services/portofolio.services'

export const getPortfolioController = (c: Context) => {
  const portfolio = getPortfolio()

  return c.json({
    success: true,
    data: portfolio,
  })
}
