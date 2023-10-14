import { categorias } from "../data/categoria"
import Categoria from "../components/Categoria"

export default function Sidebar() {
    // Lo que este dentro del return es lo que se muestra en pantalla
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className="w-40" 
                    src="img/logo.svg"
                />
            </div>

            {/* Comunicamos desde Sidebar hacia Categoria */}
            <div className="mt-10">
                {/* categorias.map genera un nuevo arreglo para mostrar en pantalla */}
                {categorias.map( categoria => (
                    // <p>{categorias.nombre}</p>
                    <Categoria 
                        // pasar el obj categorias al componente Categoria a traves de props (argumentos)
                        // se pueden pasar: string, booleanos, array, funciones
                        categoria={categoria}
                    />
                ))} 
            </div>
        </aside>
    )
} 