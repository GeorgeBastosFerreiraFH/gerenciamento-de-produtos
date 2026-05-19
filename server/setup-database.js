import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const sql = neon(process.env.DATABASE_URL)

async function setupDatabase() {
  console.log('Iniciando setup do banco de dados...\n')

  try {
    // Criar tabela de admins
    console.log('1. Criando tabela admins...')
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('   Tabela admins criada com sucesso!\n')

    // Criar tabela de produtos
    console.log('2. Criando tabela products...')
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        quantity INTEGER DEFAULT 0,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('   Tabela products criada com sucesso!\n')

    // Verificar se admin ja existe
    console.log('3. Verificando admin padrao...')
    const existingAdmin = await sql`SELECT id FROM admins WHERE email = 'admin@admin.com'`
    
    if (existingAdmin.length === 0) {
      // Criar admin padrao
      const hashedPassword = bcrypt.hashSync('admin123', 10)
      await sql`
        INSERT INTO admins (email, password) 
        VALUES ('admin@admin.com', ${hashedPassword})
      `
      console.log('   Admin padrao criado!')
      console.log('   Email: admin@admin.com')
      console.log('   Senha: admin123\n')
    } else {
      console.log('   Admin padrao ja existe!\n')
    }

    // Inserir produto de exemplo
    console.log('4. Verificando produto de exemplo...')
    const existingProduct = await sql`SELECT id FROM products WHERE name = 'Produto Exemplo'`
    
    if (existingProduct.length === 0) {
      await sql`
        INSERT INTO products (name, description, quantity) 
        VALUES ('Produto Exemplo', 'Este e um produto de demonstracao do sistema', 50)
      `
      console.log('   Produto de exemplo criado!\n')
    } else {
      console.log('   Produto de exemplo ja existe!\n')
    }

    console.log('========================================')
    console.log('Setup concluido com sucesso!')
    console.log('========================================')
    console.log('\nAgora voce pode rodar: pnpm run dev:full')
    console.log('E fazer login com:')
    console.log('  Email: admin@admin.com')
    console.log('  Senha: admin123')

  } catch (error) {
    console.error('Erro no setup:', error.message)
    process.exit(1)
  }
}

setupDatabase()
