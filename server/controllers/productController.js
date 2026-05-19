import sql from '../db/index.js'
import { unlinkSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ITEMS_PER_PAGE = 12

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const offset = (page - 1) * ITEMS_PER_PAGE

    let products
    let countResult

    if (search) {
      products = await sql`
        SELECT * FROM products 
        WHERE name ILIKE ${'%' + search + '%'} 
        ORDER BY created_at DESC 
        LIMIT ${ITEMS_PER_PAGE} 
        OFFSET ${offset}
      `
      countResult = await sql`
        SELECT COUNT(*) as total FROM products 
        WHERE name ILIKE ${'%' + search + '%'}
      `
    } else {
      products = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC 
        LIMIT ${ITEMS_PER_PAGE} 
        OFFSET ${offset}
      `
      countResult = await sql`SELECT COUNT(*) as total FROM products`
    }

    const total = parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

    res.json({
      products,
      currentPage: page,
      totalPages,
      total
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ message: 'Erro ao buscar produtos' })
  }
}

export const getProductStats = async (req, res) => {
  try {
    const totalResult = await sql`SELECT COUNT(*) as total FROM products`
    const stockResult = await sql`SELECT COALESCE(SUM(quantity), 0) as total FROM products`
    const lowStockResult = await sql`SELECT COUNT(*) as total FROM products WHERE quantity <= 10`
    
    const chartData = await sql`
      SELECT name, quantity FROM products 
      ORDER BY created_at DESC 
      LIMIT 7
    `

    res.json({
      totalProducts: parseInt(totalResult[0].total),
      totalStock: parseInt(stockResult[0].total),
      lowStock: parseInt(lowStockResult[0].total),
      chartData: chartData.reverse()
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Erro ao buscar estatisticas' })
  }
}

export const getRecentProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC 
      LIMIT 5
    `
    res.json(products)
  } catch (error) {
    console.error('Get recent error:', error)
    res.status(500).json({ message: 'Erro ao buscar produtos recentes' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, quantity } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    if (!name) {
      return res.status(400).json({ message: 'Nome e obrigatorio' })
    }

    const result = await sql`
      INSERT INTO products (name, description, quantity, image)
      VALUES (${name}, ${description || null}, ${parseInt(quantity) || 0}, ${image})
      RETURNING *
    `

    res.status(201).json(result[0])
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ message: 'Erro ao criar produto' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, quantity } = req.body
    
    const existing = await sql`SELECT * FROM products WHERE id = ${id}`
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Produto nao encontrado' })
    }

    let image = existing[0].image
    
    if (req.file) {
      if (existing[0].image) {
        const oldImagePath = join(__dirname, '..', existing[0].image)
        if (existsSync(oldImagePath)) {
          try {
            unlinkSync(oldImagePath)
          } catch (err) {
            console.error('Error deleting old image:', err)
          }
        }
      }
      image = `/uploads/${req.file.filename}`
    }

    const result = await sql`
      UPDATE products 
      SET name = ${name}, 
          description = ${description || null}, 
          quantity = ${parseInt(quantity) || 0}, 
          image = ${image},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    res.json(result[0])
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ message: 'Erro ao atualizar produto' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const existing = await sql`SELECT * FROM products WHERE id = ${id}`
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Produto nao encontrado' })
    }

    if (existing[0].image) {
      const imagePath = join(__dirname, '..', existing[0].image)
      if (existsSync(imagePath)) {
        try {
          unlinkSync(imagePath)
        } catch (err) {
          console.error('Error deleting image:', err)
        }
      }
    }

    await sql`DELETE FROM products WHERE id = ${id}`

    res.json({ message: 'Produto excluido com sucesso' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ message: 'Erro ao excluir produto' })
  }
}
