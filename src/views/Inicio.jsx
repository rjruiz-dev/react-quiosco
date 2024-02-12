// import { productos as data} from '../data/productos'
import useSWR from 'swr'
import Producto from "../components/Producto"
import useQuiosco from '../hooks/useQuiosco';
import clienteAxios from '../config/axios';

export default function Inicio() {

    const { categoriaActual } = useQuiosco()
    // console.log(categoriaActual)

    // consulta SWR
    const fetcher = () => clienteAxios('/api/productos').then(data => // console.log(data)
        data.data
    )
    
    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
        refreshInterval: 1000 // 1seg
    })
    // console.log(data)
    // console.log(error)
    // console.log(isLoading)
    if(isLoading) return 'Cargando...'
    // return

    // console.log(productos)
    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
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