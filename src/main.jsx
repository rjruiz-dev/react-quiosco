import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* QuioscoProvider rodea toda la app y de esta forma va a estar disponible de forma global nuestro estado va a estar sicronizado en todos los componentes */}
    <QuioscoProvider>
      <RouterProvider router={router} />
    </QuioscoProvider>

  </React.StrictMode>,
)
