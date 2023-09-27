import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element:  <Layout />//cargar un componente de react
    }
])

export default router