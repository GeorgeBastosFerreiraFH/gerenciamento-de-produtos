import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Package, Loader2 } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import DeleteModal from '../components/DeleteModal'
import toast from 'react-hot-toast'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

export default function Products() {
  const {
    products,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    setProducts,
    setLoading,
    setSearchTerm,
    setCurrentPage,
    setTotalPages,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProductStore()

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [currentPage, searchTerm])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await productService.getAll(currentPage, searchTerm)
      setProducts(data.products)
      setTotalPages(data.totalPages)
    } catch (error) {
      toast.error('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setDeleteModalOpen(true)
  }

  const handleSaveProduct = async (formData) => {
    try {
      if (selectedProduct) {
        const updated = await productService.update(selectedProduct.id, formData)
        updateProduct(selectedProduct.id, updated)
        toast.success('Produto atualizado com sucesso!')
      } else {
        const created = await productService.create(formData)
        addProduct(created)
        toast.success('Produto criado com sucesso!')
      }
      setModalOpen(false)
      loadProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar produto')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await productService.delete(productToDelete.id)
      deleteProduct(productToDelete.id)
      toast.success('Produto excluido com sucesso!')
      setDeleteModalOpen(false)
      setProductToDelete(null)
    } catch (error) {
      toast.error('Erro ao excluir produto')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Produtos</h1>
          <p className="text-gray-500 text-sm">{products.length} produtos cadastrados</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddProduct}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] text-[#0a0e14] font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#2dd4bf]/20 transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Produto</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-96 pl-12 pr-4 py-3 rounded-xl bg-[#0d1117] border border-[#1e2a3a] text-white placeholder-gray-500 focus:border-[#2dd4bf] focus:outline-none transition-colors"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-[#2dd4bf] animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d1117] border border-[#1e2a3a] rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#1e2a3a] flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? 'Tente buscar por outro termo'
              : 'Comece adicionando seu primeiro produto'}
          </p>
          {!searchTerm && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddProduct}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] text-[#0a0e14] font-semibold"
            >
              Adicionar Produto
            </motion.button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] text-[#0a0e14]'
                      : 'bg-[#1e2a3a] text-gray-400 hover:bg-[#2a3a4a]'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>
          )}
        </>
      )}

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
      />
    </div>
  )
}
