import { Hono } from 'hono'
import portofolioRoutes from './routes/portofolio.routes'
import skillsRoutes from './routes/skills.routes'
import type { Bindings } from './types/env'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const routes = app
  .route('/api/portfolio', portofolioRoutes)
  .route('/api/skills', skillsRoutes)

export default app
export type AppType = typeof routes