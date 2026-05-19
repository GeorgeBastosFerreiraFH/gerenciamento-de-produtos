import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070b11] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Glow */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-[#2dd4bf]/12 blur-[120px] rounded-full" />
    </div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#223041] bg-[#0b1017]/80 backdrop-blur-xl p-10 md:p-14 text-center shadow-2xl shadow-[0_0_80px_rgba(45,212,191,0.05)]"
        >
        {/* Icon */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-32 h-32 rounded-full bg-[#2dd4bf]/10 blur-3xl" />

          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-[#2dd4bf]/20">
            <AlertTriangle className="w-14 h-14 text-[#0a0e14]" />
          </div>
        </div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-8xl font-black tracking-tight text-white mb-4"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          Página não encontrada
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto mb-10"
        >
          A página que você tentou acessar não existe, foi removida
          ou está temporariamente indisponível.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] text-[#0a0e14] font-semibold hover:shadow-xl hover:shadow-[#2dd4bf]/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para o Dashboard
          </Link>
        </motion.div>

        {/* Bottom Line */}
        <div className="mt-10 w-full h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/30 to-transparent" />
      </motion.div>
    </div>
  )
}