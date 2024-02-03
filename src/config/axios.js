import axios from "axios";

// crear el cliente axios siempre que llame esta lib busca esta config
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export default clienteAxios
