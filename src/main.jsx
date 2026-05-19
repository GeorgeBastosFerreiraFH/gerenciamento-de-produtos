import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #1a1a24 0%, #12121a 100%)',
            color: '#f5f5f5',
            border: '1px solid rgba(42, 42, 56, 0.8)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          },
          success: {
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#0a0a0f',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0a0a0f',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
