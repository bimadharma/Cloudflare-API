import { Hono } from 'hono'
import portofolioRoutes from './routes/portofolio.routes'
import skillsRoutes from './routes/skills.routes'
import experiencesRoutes from './routes/experiences.routes'
import projectsRoutes from './routes/projects.routes'
import type { Bindings } from './types/env'
import certificationsRoutes from './routes/certifications.routes'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const routes = app
  .route('/api/portfolio', portofolioRoutes)
  .route('/api/skills', skillsRoutes)
  .route('/api/experiences', experiencesRoutes)
  .route('/api/projects', projectsRoutes)
  .route('/api/certifications', certificationsRoutes)
export default app
export type AppType = typeof routes