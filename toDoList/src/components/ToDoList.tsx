import { useEffect, useState } from "react";
import { watchUserTasks } from "../services/user-service";
import Table from "./Table";

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


    return (
        <div className="flex w-full justify-center mt-5">
            <div className="border rounded-xl mx-5 w-1/2" id="to-do-tasks">
                <div className="flex justify-center" id="to-do-title">
                    <h1 className="text-2xl">To Do List</h1>
                </div>
                <Table listOfTasks={toDoTasks} button="Remove"/>
            </div>

            <div className="divider lg:divider-horizontal">OR</div>

            <div className="border mx-5 w-1/2 rounded-xl" id="done-tasks">
                <div className="flex justify-center" id="done-title">
                    <h1 className="text-2xl">Done List </h1>
                </div>

                <div>
                    List of the tasks you have done
                </div>
            </div>

        </div>
    );

};


export default ToDoList;