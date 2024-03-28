import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ToDoList from "../components/ToDoList";
import CreateTask from "../components/CreateTask";

const Home = () => {


    const { userData } = useContext(AppContext)

    const [createMode, setCreateMode] = useState(false)

    console.log(createMode)


    return (
        <div className="flex flex-col">
            <div>
                <button className="btn btn-primary" onClick={() => setCreateMode(!createMode)}>Create Task</button>
            </div>
            {createMode && <CreateTask />}
            
            <div>
                <ToDoList userData={userData} />
            </div>

        </div>
    );
};


export default Home;