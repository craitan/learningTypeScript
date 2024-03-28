import { useContext } from "react";
import AppContext from "../context/AppContext";
import ToDoList from "../components/ToDoList";

const Home = () => {


    const { userData } = useContext(AppContext)




    return (
        <div>
            <ToDoList userData={userData} />
        </div>
    );
};


export default Home;