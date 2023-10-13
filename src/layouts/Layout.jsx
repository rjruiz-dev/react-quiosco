// Dependencias o Hooks

// Componentes
import { Outlet } from 'react-router-dom' // Para visualizar el hijo
import  Sidebar  from '../components/Sidebar'
import  Resumen  from '../components/Resumen'

// Funciones

// Hojas de estilo 

export default function Layout() {
    return (
        <div className='md:flex'> {/* de izq a der tamaño mediano */}
            <Sidebar />

            <main className='flex-1'>
                <Outlet /> {/* las rutas que vamos definiendo */}
            </main>

            <Resumen />
        </div>
    )
}
