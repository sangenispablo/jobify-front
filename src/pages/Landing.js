import { Link } from "react-router-dom";

import main from "../assets/images/main.svg";

// importamos Wrapper que estiliza el componente
import Wrapper from "../assets/wrappers/LandingPage";

import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>track</span> app
          </h1>
          <p>
            Mixtape plaid disrupt jean shorts normcore franzen neutra typewriter
            sriracha godard health goth ennui. Meggings schlitz williamsburg
            90's leggings iPhone. Bushwick hell of cliche meditation yuccie,
            succulents photo booth salvia migas polaroid quinoa offal.
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job_hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
