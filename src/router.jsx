import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'

const router = createBrowserRouter([
    {
        path: '/',
        element:  <Layout />, // Cargar un componente de react
        children: [
            {
                index: true,
                element: <Inicio />
            } // cada objeto es una pagina
        ] // Lo que este definido como sus hijos va a utilizar este layout
    },
    {
        path: '/auth',
        element:  <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            }, 
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ] 
    }
])

export default router