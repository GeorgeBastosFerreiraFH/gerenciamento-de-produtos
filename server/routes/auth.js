import { Router } from 'express'
import { login, createAdmin } from '../controllers/authController.js'

const router = Router()

router.post('/login', login)

router.post('/setup', async (req, res) => {
  try {
    const admin = await createAdmin('admin@admin.com', 'admin123')
    res.json({ message: 'Admin criado com sucesso', admin: { email: admin.email } })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar admin' })
  }
})

export default router
