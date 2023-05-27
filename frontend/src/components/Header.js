import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="navbar navbar-expand-lg navbar-light" style={{ background: "#303036" }}>
      <div className="container" >
        <Link to="/" className="navbar-brand" style={{ color: 'white' }}>
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
                    <Link to="/home" className="nav-link" style={{ color: 'white' }}>
                      My boxes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/publish" className="nav-link" style={{ color: 'white' }}>
                      Add Box
                    </Link>
                  </li>
                  {context.user.admin && (
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link" style={{ color: 'white' }}>
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={{ color: 'white' }}>
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
                      <span className="nav-link" style={{ color: 'white' }}>
                        Logged in as {context.user.username}
                      </span>
                    </li>
                    <li className="nav-item">
                      <Link to="/logout" className="nav-link" style={{ color: 'white' }}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link" style={{ color: 'white' }}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link" style={{ color: 'white' }}>
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/info" className="nav-link" style={{ color: 'white' }}>
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
