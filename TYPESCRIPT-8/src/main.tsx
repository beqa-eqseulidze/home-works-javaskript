import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'      // ← ეს ხაზი უნდა იყოს!
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)