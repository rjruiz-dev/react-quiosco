import { useState, useEffect } from "react" // viene definida en react
import useQuiosco from "../hooks/useQuiosco" // Importar el hook para tener acceso al producto
import { formatearDinero } from "../helpers"

// Extrar el producto y pasarlo al modal ventaja de context api
export default function ModalProducto(){

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useQuiosco();
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)
   
    // En este caso cada ves que el pedido cambie se vuelve a ejecutar (detectar si el producto que estoy abriendo ya se encuentra en el pedido)
    // Evitamos duplicados de elementos y podemos act las cantidades    
    useEffect(() => { // useEffect siempre va a tener un callback
        // console.log('componente listo')
        if(pedido.some( pedidoState => pedidoState.id === producto.id)) {
            // console.log('Si esta en el pedido...')
            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0]

            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }/*else { console.log('No esta en el pedido') }*/
    },
    // [] arreglo de dependencias son opc si va vacio, el useEfect se ejecuta 1 sola ves
    [pedido])

    return (
        <div className="md:flex items-center gap-10">
           {/* Del lado izq la imagen y del lado der la informacion  */}
            <div className="md:w-1/3"> {/*1 de 3 columnas*/}
                <img 
                    alt={`Imagen producto ${producto.nombre}`} 
                    src={`/img/${producto.imagen}.jpg`}
                />
            </div>

            <div className="md:w-2/3"> {/*2 de 3 columnas*/}
                <div className="flex justify-end">
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                
                <h1 className="text-3xl font-bold mt-5">
                    {producto.nombre}
                </h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    {/* {producto.precio} */}
                    {formatearDinero(producto.precio)}
                </p>
                <div className="flex gap-4 mt-5">
                    {/* boton - */}
                    <button
                        type="button"
                        onClick={() => {
                            // solo se pueden agregar hasta 5 productos
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <p className="text-3xl">{cantidad}</p>
                    {/* boton + */}
                    <button
                        type="button"
                        onClick={() => {
                            // solo se pueden agregar hasta 5 productos
                            if(cantidad >= 5) return
                            setCantidad(cantidad + 1);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <button 
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-5 mt-5 text-white
                    font-bold uppercase rounded"
                    // // con ...producto del lado izq: agregamos la cantidad dentro del obj producto
                    onClick={() => {
                        // Se debe comporbar si el producto ya existe en el pedido, si existe identificar q elemento es y reescribirlo, sino existe lo agregamos
                        handleAgregarPedido({...producto, cantidad})
                        handleClickModal()
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Añadir al pedido'}
                </button>
            </div>
       </div>
    )
}
