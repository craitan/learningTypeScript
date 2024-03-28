import { useEffect, useState } from "react";
import { watchUserTasks } from "../services/user-service";

type ToDoListProps = {
    userData: {
        username: string;
        email: string;
        uid: string;
        firstName: string;
        lastName: string;
        toDo: object;
        done: object;
    } | null;
};

interface Task {
    id: string;
    taskName: string;
    taskContent: string;
    taskStart: string;
    taskEnd: string;
    done: boolean;
    important: boolean;
}


const ToDoList = ({ userData }: ToDoListProps) => {

    const [toDoTasks, setToDoTasks] = useState<Task[]>([]);


    useEffect(() => {
        if (!userData) {
            console.error('User data is not available');
            return;
        }
        watchUserTasks(userData?.username, setToDoTasks)

    }, [userData]);

    console.log(toDoTasks)

    return (
        <div className="flex justify-between mt-5">
            <div className="border">
                <h1 className="text-2xl">To Do List</h1>
                <div>
                    {toDoTasks.map((task, index) =>
                        <div key={index}>
                            <h1>{task.taskName}</h1>
                            <p>{task.taskContent}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="border">
                <h1 className="text-2xl">Done List </h1>
                <div>
                    List of the tasks you have done
                </div>
            </div>

        </div>
    );

};


export default ToDoList;