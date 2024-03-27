import { useContext } from "react";
import AppContext from "../context/AppContext";

const Home = () => {

    const { userData } = useContext(AppContext);
    
    return (
        <div>
            <button className="btn btn-secondary">Secondary</button>
        </div>
    );
};


export default Home;