import './index.css'

import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f172a",
            border: "1px solid #334155",
            color: "#e2e8f0",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.4)",
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#0f172a" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0f172a" } },
          duration: 3000,
        }}
      />
    </BrowserRouter>
  </Provider>
)
