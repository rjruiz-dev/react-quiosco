// Dependencias o Hooks

// Componentes
import { Outlet } from 'react-router-dom' // Para visualizar el hijo
import  Sidebar  from '../components/Sidebar'
import  Resumen  from '../components/Resumen'
import useQuiosco from '../hooks/useQuiosco'

// Funciones

// Hojas de estilo 

export default function Layout() {

    const {modal} = useQuiosco();
    console.log(modal);
    
    return (
        <div className='md:flex'> {/* de izq a der tamaño mediano */}
            <Sidebar />

            <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                <Outlet /> {/* las rutas que vamos definiendo */}
            </main>

            <Resumen />
        </div>
    )
}
