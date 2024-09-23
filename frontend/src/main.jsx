import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './hooks/AuthContext';


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,

{/* <StrictMode>
<App />
</StrictMode>, */}
)
