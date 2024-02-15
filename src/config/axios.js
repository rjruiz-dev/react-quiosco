import axios from "axios";

// crear el cliente axios siempre que llame esta lib busca esta config
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: se envian antes de la peticion
    headers: {
        'Accept' : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: true
})

export default clienteAxios
