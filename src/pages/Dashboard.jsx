import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Layers, AlertTriangle, TrendingUp, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { productService } from '../services/productService'
import toast from 'react-hot-toast'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    avgPerProduct: 0,
    chartData: []
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [statsData, recentData] = await Promise.all([
        productService.getStats(),
        productService.getRecent()
      ])
      setStats(statsData)
      setRecentProducts(recentData)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
    },
    {
      title: 'Estoque Total',
      value: stats.totalStock,
      icon: Layers,
    },
    {
      title: 'Estoque Baixo',
      value: stats.lowStock,
      subtitle: '< 5 unidades',
      icon: AlertTriangle,
    },
    {
      title: 'Media por Produto',
      value: stats.avgPerProduct || Math.round(stats.totalStock / (stats.totalProducts || 1)),
      icon: TrendingUp,
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-3 border-[#2dd4bf] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Visao geral do seu inventario</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            className="bg-[#0d1117] border border-[#1e2a3a] rounded-xl p-5 hover:border-[#2dd4bf]/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1e2a3a] flex items-center justify-center mb-4">
              <card.icon className="w-5 h-5 text-[#2dd4bf]" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.title}</p>
            {card.subtitle && (
              <p className="text-gray-600 text-xs mt-1">{card.subtitle}</p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 bg-[#0d1117] border border-[#1e2a3a] rounded-xl p-5"
        >
          <h3 className="text-base font-semibold text-white mb-4">Estoque por Produto</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#4b5563" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#4b5563" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0d1117',
                    border: '1px solid #1e2a3a',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#2dd4bf' }}
                  formatter={(value) => [`${value} un.`, 'Quantidade']}
                />
                <Bar 
                  dataKey="quantity" 
                  fill="#2dd4bf" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Products */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#0d1117] border border-[#1e2a3a] rounded-xl p-5"
        >
          <h3 className="text-base font-semibold text-white mb-4">Produtos Recentes</h3>
          
          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              Nenhum produto cadastrado
            </p>
          ) : (
            <div className="space-y-3">
              {recentProducts.slice(0, 5).map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e2a3a]/50 transition-colors"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#1e2a3a] flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(product.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#2dd4bf]">{product.quantity}</p>
                    <p className="text-xs text-gray-500">un.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
