import axios from 'axios'
import { useAuthStore } from '../store/authStore'

// ========================================
// API BASE URL
// ========================================

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ========================================
// AXIOS INSTANCE
// ========================================

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status

    // ========================================
    // TOKEN EXPIRADO OU INVÁLIDO
    // ========================================

    if (status === 401) {
      const { logout } = useAuthStore.getState()

      logout()

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    // ========================================
    // BACKEND OFFLINE
    // ========================================

    if (error.code === 'ERR_NETWORK') {
      console.error('Servidor offline ou inacessível')
    }

    // ========================================
    // CORS / NETWORK ERROR
    // ========================================

    if (
      error.message?.includes('Network Error') ||
      error.message?.includes('CORS')
    ) {
      console.error('Erro de conexão com a API')
    }

    return Promise.reject(error)
  }
)

export default api