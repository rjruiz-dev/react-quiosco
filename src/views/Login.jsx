import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

export default function Login() {    
   
    const emailRef                = createRef();
    const passwordRef             = createRef();    
   
    const [errores, setErrores]  = useState([])

    // click a btn enviar del formulario se manda a llamar esta funcion
    const handleSubmit = async e => {
        e.preventDefault() // previene la accion por default del navegador

        // creamos el objetos datos
        const datos = {
            // console.log(nameRef);
            // asi lo espera el backend laravel          
            email: emailRef.current.value,
            password: passwordRef.current.value,            
        }
        try {         
            const respuesta = await clienteAxios.post('/api/login', datos);
            console.log(data.token);
        } catch (error) {           
            // console.log(error);
            setErrores(Object.values(error.response.data.errors)) 
        }
    }
    return (
        <>
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >Email:</label>
                        <input 
                            type="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Tu email" 
                            ref={emailRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password"
                        >Password:</label>
                        <input 
                            type="password"
                            id="password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Tu password"
                            ref={passwordRef} 
                        />
                    </div>                 

                    <input 
                        type="submit"
                        value="Iniciar sesión"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 
                        p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    );
}