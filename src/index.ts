
import { Hono } from 'hono'
import portfolioRoutes from './routes/portofolio.routes'
import type { Bindings } from './types/env'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/portfolio', portfolioRoutes)

export default app