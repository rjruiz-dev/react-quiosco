import { useEffect } from 'react'
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

// cada instancia del hook tendra middleware, url
// esto no estara en un context, porque la autenticacion no tiene que ser global, se puede inicializar en cada componente
export const useAuth = ({ middleware, url }) => {
    
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();
    
    const { data: user, error, mutate } = useSWR('/api/user', () => 
        // el callback llama en automatico a clienteAxios
        clienteAxios('api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // promesas porque useSWR no es asincrono
        .then(res => res.data)
        .catch(error => {
            // forzar el error en caso de que ocurra
            throw Error(error?.response?.data?.errors) // ? optional changue
        })
    )

    const login = async(datos, setErrores) => {
        try {         
            const {data} = await clienteAxios.post('/api/login', datos);
            // console.log(data.token);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]); // si todo esta ok, reiniciamos como un arreglo vacio 
            await mutate() // es una funcion que viene incluida en swr vuele a llamar  o revalida
        } catch (error) {           
            // console.log(error);
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const registro = () => {
        
    }

    const logout = () => {
        
    }

    console.log('user ', user);
    console.log('error ', error);
    console.log('middleware ', middleware);
    console.log('url ', url);
    
    // escucha por los cambios que sucedan en user como en error, en caso de que alla un usuario lo llevamos a la pagina para que pueda realixar el pedido
    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }
    }, [user, error])

    return {
        login,
        registro,
        logout
    }
}