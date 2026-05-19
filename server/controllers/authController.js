import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sql from '../db/index.js'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha sao obrigatorios' })
    }

    const admins = await sql`SELECT * FROM admins WHERE email = ${email}`
    const admin = admins[0]

    if (!admin) {
      return res.status(401).json({ message: 'Credenciais invalidas' })
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais invalidas' })
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const createAdmin = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const existing = await sql`SELECT * FROM admins WHERE email = ${email}`
  
  if (existing.length > 0) {
    console.log('Admin ja existe')
    return existing[0]
  }
  
  const result = await sql`
    INSERT INTO admins (email, password) 
    VALUES (${email}, ${hashedPassword})
    RETURNING *
  `
  
  console.log('Admin criado com sucesso')
  return result[0]
}
