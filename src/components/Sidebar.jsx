import useQuiosco from "../hooks/useQuiosco" 
import Categoria from "../components/Categoria"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {

    const { categorias } = useQuiosco()
    const { logout, user } = useAuth({ middleware: 'auth'})
    // Lo que este dentro del return es lo que se muestra en pantalla
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className="w-40" 
                    src="img/logo.svg"
                    alt="Imagen Logo"
                />
            </div>

            <p className="my-10 text-2xl font-black text-center">Hola: {user?.name}</p>

            {/* Comunicamos desde Sidebar hacia Categoria */}
            <div className="mt-10">
                {/* categorias.map genera un nuevo arreglo para mostrar en pantalla */}
                {categorias.map( categoria => (
                    // <p>{categorias.nombre}</p>
                    <Categoria 
                        // pasar el obj categorias al componente Categoria a traves de props (argumentos)
                        // se pueden pasar: string, booleanos, array, funciones
                        // categoria={categoria}
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))} 
            </div>

            <div className="my-5 px-5">
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Cancelar Orden
               </button>
            </div>
        </aside>
    )
} 