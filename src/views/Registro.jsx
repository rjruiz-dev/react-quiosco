import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    // cuando se presione en crear cuenta van acceder directamente a ese elemento del DOM y acceder a la informacion que tenga cada uno de los inputs, 
    const nameRef                 = createRef();
    const emailRef                = createRef();
    const passwordRef             = createRef();
    const passwordConfirmationRef = createRef();

    // creamos un state para las validaciones (el usuario puede ingresar informacion incorrecta, pero luego corrige sobre el mismo input, aun asi tenemos las validaciones de los demas inputs)
    const [errores, setErrores]  = useState([])
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    // click a btn enviar del formulario se manda a llamar esta funcion
    const handleSubmit = async e => {
        e.preventDefault() // previene la accion por default del navegador

        // creamos el objetos datos
        const datos = {
            // console.log(nameRef);
            // asi lo espera el backend laravel
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        
        registro(datos, setErrores)
    }
    return (
        <>
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input 
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Tu nombre" 
                            ref={nameRef}
                        />
                    </div>

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

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >Repetir Password:</label>
                        <input 
                            type="password"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Repetir password" 
                            ref={passwordConfirmationRef}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Crear cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 
                        p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>

            <nav className="mt-5">
                {/* <a href="/auth/login">
                    ¿Ya tienes cuenta? Inicia sesión
                </a> */}
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia sesión
                </Link> {/* Evita recargar la pagina routing instantaneo */}
            </nav>
        </>
    );
}