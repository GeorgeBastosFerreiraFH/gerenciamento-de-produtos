import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Header({ onMenuClick }) {
  const navigate = useNavigate()
  const { admin, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-dark-600/50">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-600 transition-colors"
        >
          <Menu className="w-6 h-6 text-neutral-300" />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-neutral-100">
            Bem-vindo de volta
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass-card">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-petrol-500 flex items-center justify-center">
              <User className="w-4 h-4 text-dark-900" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-200">Admin</p>
              <p className="text-xs text-neutral-500">{admin?.email || 'admin@admin.com'}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-dark-600/50 hover:bg-red-500/20 hover:text-red-400 text-neutral-400 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
