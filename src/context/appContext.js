import React, { useReducer, useContext } from "react";

// en el reducer donde se produce todas las modificaciones del state
import reducer from "./reducer";

import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

// Mi estado inicial del contexto, estos datos tienen alcance en toda la app
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

// creo el contexto
const AppContext = React.createContext();

// creo el provider que es como un wrapper los componentes que quiero que tengan acceso
// a los datos
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (texto = "Error") => {
    dispatch({ type: DISPLAY_ALERT, payload: texto });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 1800);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
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
