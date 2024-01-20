// Dependencias o Hooks
import Modal from 'react-modal'
// Componentes
import { Outlet } from 'react-router-dom' // Para visualizar el hijo
import  Sidebar  from '../components/Sidebar'
import  Resumen  from '../components/Resumen'
import useQuiosco from '../hooks/useQuiosco'

// Funciones

// Hojas de estilo 
const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

export default function Layout() {

    const {modal, handleClickModal} = useQuiosco();
    console.log(modal);

    return (
        <>
            <div className='md:flex'> {/* de izq a der tamaño mediano */}
                <Sidebar />

                <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                    <Outlet /> {/* las rutas que vamos definiendo */}
                </main>

                <Resumen />
            </div>

            {/* indicamos que es codigo de js */}
            { modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <p>Desde modal</p>
                    <button onClick={handleClickModal}>
                        Cerrar
                    </button>
                </Modal>

            )}
        </>        
    )
}
