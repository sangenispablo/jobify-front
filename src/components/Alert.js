import { useAppContext } from "../context/appContext";

// Esto es un componente para meter un alert
const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
