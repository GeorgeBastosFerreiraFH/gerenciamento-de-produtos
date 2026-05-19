import { motion } from 'framer-motion'
import { Hammer, Construction } from 'lucide-react'

export default function Obras() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden w-full max-w-2xl rounded-3xl border border-[#1e2a3a] bg-[#0d1117]/80 backdrop-blur-xl p-10 text-center shadow-2xl"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2dd4bf]/5 via-transparent to-[#3b82f6]/5 pointer-events-none" />

        {/* Icon */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-28 h-28 rounded-full bg-[#2dd4bf]/10 blur-3xl" />

          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-[#2dd4bf]/20">
            <Hammer className="w-12 h-12 text-[#0a0e14]" />
          </div>
        </div>

        {/* Title */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/10 text-[#2dd4bf] text-sm font-medium mb-6">
            <Construction className="w-4 h-4" />
            Área em desenvolvimento
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Módulo de Obras
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            Esta área ainda está sendo desenvolvida e em breve contará com
            gerenciamento completo de obras, etapas, custos, equipes e muito mais.
          </p>
        </div>

        {/* Bottom Glow Line */}
        <div className="mt-10 w-full h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/30 to-transparent" />
      </motion.div>
    </div>
  )
}