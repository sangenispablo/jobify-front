import { useState } from "react";

import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/RegisterPage";

// El isMember se usa para cambiar entre Login y Register
// yo agrego el confirm password con password1

const initialState = {
  name: "",
  email: "",
  password: "",
  password1: "",
  isMember: true,
};

const Register = () => {
  // Con este useState manejo los inputs
  const [values, setValues] = useState(initialState);

  // Con este useAppContext manejo los estados globales
  const { isLoading, showAlert, displayAlert, registerUser } = useAppContext();

  // Esto cambiar de Login a Register
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // Manejo los cambios en los inputs y los mando al useState
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Manejo el boton submit del Form
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password1, isMember } = values;
    if (!email || !password || (!isMember && (!name || !password1))) {
      displayAlert("Complete todo el formulario!!");
      return;
    }
    const currentUser = { name, email, password };
    // isMember me indica si estoy en Login o en Register
    if (isMember) {
      console.log("already a member");
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* toggle name */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          labelText="email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        />
        {/* toggle confirm password */}
        {!values.isMember && (
          <FormRow
            type="password"
            name="password1"
            value={values.password1}
            handleChange={handleChange}
            labelText="confirm password"
          />
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        {/* toggle Login Register y la leyenda del parrafo */}
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
