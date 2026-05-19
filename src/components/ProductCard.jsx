import { motion } from 'framer-motion'
import { Package, Pencil, Trash2 } from 'lucide-react'

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-[#0d1117] border border-[#1e2a3a] rounded-xl overflow-hidden hover:border-[#2dd4bf]/30 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[#1e2a3a]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-600" />
          </div>
        )}
        
        {/* Quantity Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2dd4bf] text-[#0a0e14]">
            {product.quantity} un.
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white mb-1 truncate">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
          {product.description || 'Sem descricao'}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEdit(product)}
            className="flex-1 py-2 rounded-lg bg-[#1e2a3a] hover:bg-[#2dd4bf]/10 text-gray-400 hover:text-[#2dd4bf] transition-all flex items-center justify-center gap-2 border border-transparent hover:border-[#2dd4bf]/20"
          >
            <Pencil className="w-4 h-4" />
            <span className="text-sm font-medium">Editar</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDelete(product)}
            className="flex-1 py-2 rounded-lg bg-[#1e2a3a] hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Excluir</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
