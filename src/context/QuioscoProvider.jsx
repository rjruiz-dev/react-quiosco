import { createContext, useState, useEffect  }     from "react" // viene definida en react
import { toast }                        from "react-toastify" // contiene el evento y el tipo de tost que se quiere mostrar
// import { categorias as categoriasDB }   from "../data/categoria"
import axios                            from "axios" // para consumir API
// este context va a tener acceso a un metodo llamado provider
const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    // Aqui toda la logica
    // State
        const [categorias, setCategorias]            = useState([])  //useState(categoriasDB); cambiamos el inicio a arr vacio
        const [categoriaActual, setCategoriasActual] = useState({}) //useState(categorias[0]) cambiamos el inicio a obj vacio
        const [modal, setModal]                      = useState(false)  // modal no va a estar visible, hasta q el usuario presione
        const [producto, setProducto]                = useState({})     // los prod son obj e inicia como obj vacio "{}"
        const [pedido, setPedido]                    = useState([])     // inicia como arr vacio "[]" 
        const [total, setTotal]                      = useState([0]) 

        // solo se ejecuta 1 ves si se le pasa un arr vacio
        useEffect(() => {
            // total es un acumulado
            // producto es el elemento  sobre cual esta iterenado
            const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) 
            + total, 0)
            setTotal(nuevoTotal)
        }, [pedido]) // cada ves q pedido cambia se ejecuta el useEffect para ir calculando el total

        const obtenerCategorias = async () => {
            try {
                console.log(import.meta.env.VITE_API_URL)
                // const respuesta = await axios('http://localhost/api/categorias') // la url de la api               
                const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/categorias`) // la url de la api
                // console.log(data.data)
                
                // una ves que tengo las cat puedo seterla en el state con setCategorias()
                setCategorias(data.data)

                // categoria incial
                setCategoriasActual(data.data[0])
            } catch (error) {
                console.log(error)
                
            }
        }

        // obtengo las categorias tan pronto como cargue el componente utilzo useEffect()
        useEffect(() => {
            obtenerCategorias()
        }, []) // [] para que solamente sea cuando cargue esdte componente


    // Function
        const handleClickCategoria = id => {
            // filter no regresa un nuevo arreglo con las categoria que seleccionamos
            const categoria = categorias.filter(categoria => categoria.id === id)[0] // [0] convierte el arrgelo a obj
            console.log(categoria) // arreglo
            // console.log(categoriaActual) // objeto

            // siempre usar la funcion modificadora no asignacion directa
            setCategoriasActual(categoria)
        }

        // Funcion para mostrar y para cerrar el modal 
        const handleClickModal = () => {
            setModal(!modal)
        }

        const handleSetProducto = producto => {
            setProducto(producto)
        }

        // con destructuring ...producto del lado der: eliminamos los elementos del obj q no necesitamos como categoria_id, imagen
        const handleAgregarPedido = ({categoria_id, ...producto}) => { // ahora si es un obj q podemos ir argregando al pedido
            // console.log(producto)
           
            if(pedido.some( pedidoState => pedidoState.id === producto.id)) { 
                
                // el .map permite iterar sobre todos los elementos sin modificar el arr original, retorna un arr nuevo ya modificado
                // cuando presione en agregar itera sobre todo el arr e identifica a cual act la cant, no reescribir ni agregarlo al final del arr
                const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.
                id ? producto : pedidoState) // si identificas retorna producto caso contrario retorna pedidoState lo q hay en memoria
                setPedido(pedidoActualizado) 
                toast.success('Guardado Correctamente')         
            } else {
                // no utlizar .push modifica el arr original, por eso utilizar setPedido
                // toma una copia de lo que hay en pedido y agregale este producto nuevo
                setPedido([...pedido, producto])
                toast.success('Agregado al pedido')
            }
        }

        const handleEditarCantidad = id => {
            // console.log(id)
            const productoActualizar = pedido.filter(producto => producto.id === id)[0]
            setProducto(productoActualizar)
            setModal(!modal)
        }

        const handleEliminarProductoPedido = id => {           
            // traer todos los que sean diferentes al id que le estoy pasando, regresa un nuevo arr
            const pedidoActualizado = pedido.filter(producto => producto.id !== id)
            setPedido(pedidoActualizado)
            toast.success('Eliminado del pedido')
        }
                    
    return (
        // en lugar de pasar los props de componente en componente, lo que coloco en el retrun, 
        // cuando lo mando a llamar voy a tener acceso a esa informacion
        <QuioscoContext.Provider
            // es como si fuera un props   
            value={ // la 1er {} es para indicar cod .js 
                { // la 2da {} indica que es un obj
                    // lo que esta aqui, va a estar disponible en toda la app
                    categorias,
                    categoriaActual,
                    handleClickCategoria,
                    modal,                  // consumido desde layout
                    handleClickModal,       // consumido desde producto
                    producto,
                    handleSetProducto,      // consumido desde producto
                    pedido,
                    handleAgregarPedido,    // consumido desde modalProducto
                    handleEditarCantidad,           // consumido desde resumenProducto
                    handleEliminarProductoPedido,   // consumido desde resumenProducto
                    total                           // consumido desde resumen
                }
            }
        >{children}</QuioscoContext.Provider>
    )
}

export {
    // es un export nombrado
    QuioscoProvider
}

export default QuioscoContext