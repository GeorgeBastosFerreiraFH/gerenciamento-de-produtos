import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Package, LogOut, X } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Produtos' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={clsx(
          'fixed top-0 left-0 h-full w-[180px] z-50',
          'bg-[#0d1117] border-r border-[#1e2a3a]',
          'flex flex-col',
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg border border-[#2dd4bf]/30 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-[#2dd4bf]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">ProductOS</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#1e2a3a] transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                      isActive 
                        ? 'bg-[#2dd4bf]/10 text-[#2dd4bf] border-l-2 border-[#2dd4bf]' 
                        : 'text-gray-400 hover:bg-[#1e2a3a] hover:text-white'
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#1e2a3a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg text-sm text-gray-400 hover:bg-[#1e2a3a] hover:text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
