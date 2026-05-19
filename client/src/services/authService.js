import api from './api'

// ========================================
// AUTH SERVICE
// ========================================

export const authService = {
  // ========================================
  // LOGIN
  // ========================================

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Erro ao realizar login'

      throw new Error(message)
    }
  },

  // ========================================
  // VALIDAR TOKEN / USUÁRIO
  // ========================================

  me: async () => {
    try {
      const response = await api.get('/auth/me')

      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Erro ao validar usuário'

      throw new Error(message)
    }
  },

  // ========================================
  // LOGOUT
  // ========================================

  logout: async () => {
    try {
      const response = await api.post('/auth/logout')

      return response.data
    } catch (error) {
      console.error('Erro ao realizar logout')

      return null
    }
  }
}