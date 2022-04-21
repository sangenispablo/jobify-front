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
  const [values, setValues] = useState(initialState);
  // global state and useNavigate

  const { isLoading, showAlert, displayAlert } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password1, isMember } = values;
    if (!email || !password || (!isMember && (!name || !password1))) {
      displayAlert('Por favor complete todo el formulario');
      return;
    }
    console.log(values);
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
          handleChange={handleChange}
          labelText="email"
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
        <button type="submit" className="btn btn-block">
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
