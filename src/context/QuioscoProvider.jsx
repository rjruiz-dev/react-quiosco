import { createContext, useState  } from "react" // viene definida en react
import { categorias as categoriasDB } from "../data/categoria"
// este context va a tener acceso a un metodo llamado provider
const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    // Aqui toda la logica
    // State
        const [categorias, setCategorias] =  useState(categoriasDB);
        const [categoriaActual, setCategoriasActual] = useState(categorias[0])
        const [modal, setModal] = useState(false) // modal no va a estar visible, hasta q el usuario presione
        const [producto, setProducto] = useState({}) // los prod son obj e inicia como obj vacio "{}"
        const [pedido, setPedido] = useState([]) // inicia como arr vacio "[]" 

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
        const handleAgregarPedido = ({categoria_id, imagen, ...producto}) => { // ahora si es un obj q podemos ir argregando al pedido
            // console.log(producto)
            // no utlizar .push modifica el arr original, por eso utilizar setPedido
            // toma una copia de lo que hay en pedido y agregale este producto nuevo
            setPedido([...pedido, producto])
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
                    modal,              // consumido desde layout
                    handleClickModal,   // consumido desde producto
                    producto,
                    handleSetProducto,  // consumido desde producto
                    pedido,
                    handleAgregarPedido // consumido desde modalProducto
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