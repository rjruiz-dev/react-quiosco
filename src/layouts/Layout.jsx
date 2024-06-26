// Dependencias o Hooks
import Modal from 'react-modal'
// Componentes
import { ToastContainer }   from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Outlet }           from 'react-router-dom' // Para visualizar el hijo
import  Sidebar             from '../components/Sidebar'
import  Resumen             from '../components/Resumen'
import  useQuiosco          from '../hooks/useQuiosco'
import  ModalProducto       from '../components/ModalProducto'
import { useAuth }          from '../hooks/useAuth'
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

// Montar el modal 
Modal.setAppElement('#root')

export default function Layout() {

    const {user, error} = useAuth({middleware: 'auth'})
    const {modal} = useQuiosco();
    // console.log(modal);
    console.log('user', user);
    console.log('error', error);

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
            <Modal isOpen={modal} style={customStyles}>
                <ModalProducto />
            </Modal>

            {/* registramos el componente toast */}
            <ToastContainer 
                theme="dark"
            />
        </>        
    )
}
