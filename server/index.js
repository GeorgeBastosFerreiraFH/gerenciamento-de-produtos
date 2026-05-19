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

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
