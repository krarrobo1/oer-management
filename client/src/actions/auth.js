// TODO: Gestionar la accion para autenticarse.

// Realmente necesito autenticarme?

// Mostrar todos los usuarios Registrados, o ejecutar el Auth cuando el usuario acceda a la app

// 1. Si el usuario consta en el Auth contract mostrar la interfaz de Upload.
// 2. Sino Mostrar Explore con todos los usuarios y sus repositorios de archivos para que pueda interactuar.
// 3. Darle la facilidad de Registrarse para que el tambien suba sus archivos.
import { types } from '../types';

export const init = (address, name) =>{
    return (dispatch) =>{
        dispatch(login(address, name))
    }
};

const login = (address, name) => ({
    type: types.login,
    payload: { address, name}
})

export const logout = () =>{
    return (dispatch) =>{
        dispatch({ type: types.logout })
    }
}