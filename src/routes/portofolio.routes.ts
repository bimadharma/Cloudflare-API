import { Hono } from 'hono'
import { getPortfolioController } from '../controllers/portofolio.controller'
import type { Bindings } from '../types/env'

const portfolioRoutes = new Hono<{ Bindings: Bindings }>()

portfolioRoutes.get('/', getPortfolioController)

export default portfolioRoutes