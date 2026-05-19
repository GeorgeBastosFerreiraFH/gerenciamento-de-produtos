import api from './api'

export const productService = {
  getAll: async (page = 1, search = '') => {
    const response = await api.get('/products', {
      params: { page, search }
    })
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/products/stats')
    return response.data
  },

  getRecent: async () => {
    const response = await api.get('/products/recent')
    return response.data
  },

  create: async (formData) => {
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  update: async (id, formData) => {
    const response = await api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}
