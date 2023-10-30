import { productos } from '../data/productos'
import Producto from "../components/Producto"
import useQuiosco from '../hooks/useQuiosco';

export default function Inicio() {

    const { categoriaActual } = useQuiosco()
    console.log(categoriaActual)

    console.log(productos)
    return (
        
        // <> </> fragment
        <>
            <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
            <p className='text-2xl my-10'>
                Elige y personaliza tu pedio a continuación.
            </p>
            {/* display de grid a los elem hijos 
                el grid habilita la grilla
                el gap separacion entre columnas
                grid-cols-(1,2,3) el tamaño segun la pantalla
            */}
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {productos.map(producto => (
                    <Producto 
                        key={producto.imagen}
                        producto={producto}
                    />
                ))}
            </div>
        </>
    );
}