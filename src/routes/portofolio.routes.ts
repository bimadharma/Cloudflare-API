
import { Hono } from 'hono'
import { getPortfolioController } from '../controllers/portofolio.controller'

const portfolioRoutes = new Hono()

portfolioRoutes.get('/', getPortfolioController)

export default portfolioRoutes
