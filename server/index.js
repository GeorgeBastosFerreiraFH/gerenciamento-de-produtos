import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const PORT = process.env.PORT || 3001

// ========================================
// CORS
// ========================================

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sem origin
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.log('Origin bloqueada:', origin)

      return callback(null, true)
    },
    credentials: true
  })
)

// ========================================
// Middlewares
// ========================================

app.use(express.json())

app.use(
  '/uploads',
  express.static(join(__dirname, 'uploads'))
)

// ========================================
// Routes
// ========================================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API rodando com sucesso 🚀'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// ========================================
// Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  })
})

// ========================================
// Start Server
// ========================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})