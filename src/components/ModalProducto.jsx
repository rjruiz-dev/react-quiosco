import useQuiosco from "../hooks/useQuiosco" // Importar el hook para tener acceso al producto


// Extrar el producto y pasarlo al modal ventaja de context api
export default function ModalProducto(){

    const { producto, handleClickModal } = useQuiosco();
    
    return (
        <div className="md:flex gap-10">
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
            </div>
       </div>
    )
}
