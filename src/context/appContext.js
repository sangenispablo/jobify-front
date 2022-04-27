import React, { useReducer, useContext } from "react";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";

// en el reducer donde se produce todas las modificaciones del state
// el reducer reemplaza al useState
import reducer from "./reducer";

// Mi estado inicial del contexto, estos datos tienen alcance en toda la app
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
  userLocation: "",
  jobLocation: "",
};

// creo el contexto
const AppContext = React.createContext();

// creo el provider que es como un wrapper a los componentes que quiero que tengan acceso
// a los datos del context
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Muestra y oculta el alert luego de 1.8 seg
  const displayAlert = (texto = "Error") => {
    // disparo el alert
    dispatch({ type: DISPLAY_ALERT, payload: texto });
    // meto el clearAlert dentro del display asi tenga menos funciones
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 1800);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 1800);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

// nos tenemos que asegurar de exportar el useContext como un Hook
const useAppContext = () => {
  return useContext(AppContext);
};

// exportamos el wrapper para envolver a los componentes que quiero que tenga
// acceso al context
export { AppProvider, initialState, useAppContext };
