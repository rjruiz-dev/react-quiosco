import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

export default function Registro() {

    // cuando se presione en crear cuenta van acceder directamente a ese elemento del DOM y acceder a la informacion que tenga cada uno de los inputs, 
    const nameRef                 = createRef();
    const emailRef                = createRef();
    const passwordRef             = createRef();
    const passwordConfirmationRef = createRef();

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
        try {
            // el obj que enviamos al backend
            // console.log(datos);
            const respuesta = await clienteAxios.post('/api/registro', datos);
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
            
            

    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit}>
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