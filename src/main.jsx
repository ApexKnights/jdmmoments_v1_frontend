import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { HashRouter } from "react-router-dom"
import { ContextProvider } from './context/userContext.jsx'


export const server = 'http://localhost:8000/jdm/api/v1'
createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <HashRouter>

      <StrictMode>
        <App />
      </StrictMode>

    </HashRouter>
  </ContextProvider>
)
