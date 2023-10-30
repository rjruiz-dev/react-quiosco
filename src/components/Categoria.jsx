import useQuiosco from "../hooks/useQuiosco";
export default function Categoria({categoria}) {
    
    // aqui cualquier codigo,logica de javascript 
    // console.log(props)

    const {handleClickCategoria} = useQuiosco();

    // aplicamos destructuring
    const {icono, id, nombre} = categoria
    
    // aqui lo que queremos representar
    return (
        <div className="flex items-center gap-4  border w-full p-3 hover:bg-amber-400 cursor-pointer">
            <img 
                alt="Imagen Icono" 
                src={`/img/icono_${icono}.svg`}
                className="w-12"
            /> 
            <button 
                className="text-lg font-bold cursor-pointer truncate"
                type="button"    
                // onClick={handleClickCategoria}
                onClick={()=> handleClickCategoria(id)} // call back para esparar a que suceda el evento
            >
                {nombre}
            </button>            
        </div>
    );
}

