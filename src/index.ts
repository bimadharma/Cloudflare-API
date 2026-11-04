
import { Hono } from 'hono'
import portfolioRoutes from './routes/portofolio.routes'

const app = new Hono()

// Health check
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Portfolio API is running!',
  })
})

// Portfolio routes
app.route('/api/portfolio', portfolioRoutes)

export default app
