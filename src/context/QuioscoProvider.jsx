import { createContext, useState  } from "react" // viene definida en react
import { categorias as categoriasDB } from "../data/categoria"
// este context va a tener acceso a un metodo llamado provider
const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    // Aqui toda la logica
    // State
        const [categorias, setCategorias] =  useState(categoriasDB);
        const [categoriaActual, setCategoriasActual] = useState(categorias[0])

    // Function
        const handleClickCategoria = () => {
            console.log('click en categoria')
        }
    //  ----------------------------------------

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
                    handleClickCategoria
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