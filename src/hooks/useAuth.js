import clienteAxios from "../config/axios";

// cada instancia del hook tendra middleware, url
// esto no estara en un context, porque la autenticacion no tiene que ser global, se puede inicializar en cada componente
export const useAuth = ({ middleware, url }) => {
    
    const login = async(datos, setErrores) => {
        try {         
            const {data} = await clienteAxios.post('/api/login', datos);
            // console.log(data.token);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]); // si todo esta ok, reiniciamos como un arreglo vacio 
        } catch (error) {           
            // console.log(error);
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const registro = () => {
        
    }

    const logout = () => {
        
    }

    return {
        login,
        registro,
        logout
    }
}