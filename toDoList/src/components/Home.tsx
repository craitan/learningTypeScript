import { useContext } from "react";
import AppContext from "../context/AppContext";

const Home = () => {

    
    const { userData } = useContext(AppContext)

    
    

    return (
        <div>
            <h1>{userData?.username}</h1>
            
        </div>
    );
};


export default Home;