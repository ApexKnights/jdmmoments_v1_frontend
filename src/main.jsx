import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from './context/userContext.jsx'


export const server = 'http://localhost:8000/jdm/api/v1'
createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <BrowserRouter>

      <StrictMode>
        <App />
      </StrictMode>

    </BrowserRouter>
  </ContextProvider>
)
