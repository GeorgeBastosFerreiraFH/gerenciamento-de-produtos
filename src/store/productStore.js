import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  searchTerm: '',
  currentPage: 1,
  totalPages: 1,
  
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
  
  addProduct: (product) => set((state) => ({ 
    products: [product, ...state.products] 
  })),
  
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map((p) => 
      p.id === id ? { ...p, ...updatedProduct } : p
    )
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),
}))
