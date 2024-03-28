import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ToDoList from "../components/ToDoList";
import CreateTask from "../components/CreateTask";

const Home = () => {
    const { userData } = useContext(AppContext)
    const [createMode, setCreateMode] = useState(false)

    const toggleCreateMode = () => setCreateMode(!createMode)

    return (
        <div className="flex flex-col">
            <div>
                <button className="btn btn-primary" onClick={toggleCreateMode}>Create Task</button>
            </div>
            {createMode && <CreateTask toggleCreateMode={toggleCreateMode} />}

            <ToDoList userData={userData} />
        </div>
    );
};

export default Home;