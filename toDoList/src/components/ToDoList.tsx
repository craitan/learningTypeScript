import { useEffect, useState } from "react";
import { deleteTask, markAsDone, watchUserDoneTasks, watchUserTasks } from "../services/user-service";
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

export interface Task {
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
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);


    useEffect(() => {
        if (!userData) {
            console.error('User data is not available');
            return;
        }
        watchUserTasks(userData?.username, setToDoTasks)
        watchUserDoneTasks(userData?.username, setDoneTasks)


    }, [userData]);


    const handleRemoveTask = (id: string) => {

        if (!userData) {
            console.error('User data is not available');
            return;
        }
        markAsDone(userData?.username, id);
    };


    const handleDeleteTask = (id: string) => {

        if (!userData) {
            console.error('User data is not available');
            return;
        }
        deleteTask(userData?.username, id);
    };

    
    return (
        <div className="flex w-full justify-center mt-5">
            <div className="border rounded-xl mx-5 w-1/2" id="to-do-tasks">
                <div className="flex justify-center mt-5 mb-5" id="to-do-title">
                    <h1 className="text-2xl">To Do List</h1>
                </div>
                <div className="m-5">
                    {toDoTasks.length === 0 ? (
                        <p className="text-center text-xl mt-5">No tasks available</p>
                    ) : (
                        <Table listOfTasks={toDoTasks} button="Done" handleTaskFunction={handleRemoveTask} />
                    )}
                </div>

            </div>

            <div className="divider lg:divider-horizontal">OR</div>

            <div className="border mx-5 w-1/2 rounded-xl" id="done-tasks">
                <div className="flex justify-center mt-5 mb-5" id="done-title">
                    <h1 className="text-2xl">Done List </h1>
                </div>
                <div className="m-5">
                    {toDoTasks.length === 0 ? (
                        <p className="text-center text-xl mt-5">No tasks available</p>
                    ) : (
                        <Table listOfTasks={doneTasks} button="Remove" handleTaskFunction={handleDeleteTask} />
                    )}
                </div>
            </div>
        </div>
    );

};


export default ToDoList;