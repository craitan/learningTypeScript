import { useContext } from "react";
import AppContext from "../context/AppContext";
import { logoutUser } from "../services/auth-service";

const Home = () => {

    const { userData } = useContext(AppContext);

    return (
        <div>
            <h1>{userData?.username}</h1>
            <button onClick={logoutUser} className="btn btn-secondary">Log out</button>
        </div>
    );
};


export default Home;