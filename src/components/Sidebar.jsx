import { categorias } from "../data/categoria"

export default function Sidebar() {
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className="w-40" 
                    src="img/logo.svg"
                />
            </div>

            <div className="mt-10">
                {categorias.map( categorias => (
                    <p>{categorias.nombre}</p>
                ))} {/* genera un nuevo arreglo para mostrar en pantalla */}
            </div>
        </aside>
    )
} 