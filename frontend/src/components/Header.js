import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container" >
        <Link to="/" className="navbar-brand">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <UserContext.Consumer>
            {(context) =>
              context.user && (
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">
                      My boxes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/publish" className="nav-link">
                      Add Box
                    </Link>
                  </li>
                  {context.user.admin && ( 
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link"> 
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                </ul>
              )
            }
          </UserContext.Consumer>
          <ul className="navbar-nav ml-auto">
            <UserContext.Consumer>
              {(context) =>
                context.user ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">
                        Logged in as {context.user.username}
                      </span>
                    </li>
                    <li className="nav-item">
                      <Link to="/logout" className="nav-link">
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/info" className="nav-link">
                        Info
                      </Link>
                    </li>
                  </>
                )
              }
            </UserContext.Consumer>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
