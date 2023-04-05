import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./NavigationBar.module.css";


function NavigationBar({ listOfAuthorities }) {
    const navigate = useNavigate();

    const hasAuthority = (authority) => {
        if (listOfAuthorities.includes(authority))
          return true;
        else
          return false;
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("subject");
        localStorage.removeItem("issuer");
        localStorage.removeItem("roles");
        localStorage.removeItem("expiresIn");

        navigate("/login");
    };

    return (
        <header className={classes.header}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <nav>
                    <ul>
                        {hasAuthority("AGENT") ?
                            <li>
                                <Link to='/'>Proposals</Link>
                            </li> :
                            null
                        }
                        {!(hasAuthority("AGENT") || hasAuthority("ADMIN")) ?
                            <li>
                                <Link to='/login'>Login</Link>
                            </li> :
                            null
                        }
                        {hasAuthority("ADMIN") ?
                            <li>
                                <Link to='/admin-panel'>Admin panel</Link>
                            </li> :
                            null
                        }
                    </ul>
                </nav>
                {(hasAuthority("AGENT") || hasAuthority("ADMIN")) ?
                    <Button variant="secondary" size="lg" className="me-5" onClick={logout}>Logout</Button> : 
                    null
                }
                
            </div>
        </header>
    )
}

export default NavigationBar;