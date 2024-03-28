import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth-service";


const NavBar = () => {

    const { user, setContext } = useContext(AppContext)

    const handleLogout = async () => {
        await logoutUser();
        setContext({ user: null, userData: null })
    };

    const navigate = useNavigate()

    return (
        <div className="navbar bg-base-100 shadow shadow-white justify-between">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div id="log-in-log-out" className="">
                {user ? (
                    <div className="">
                        <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
                    </div>
                ) : (
                    <div className="mr-5">
                        <button className="btn btn-accent" onClick={() => navigate('/login')}>Log In</button>
                    </div>)
                }
            </div>
        </div>
    );
};




export default NavBar;