// Funciones adicionales para ser utilizadas en distintos componentes

export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}