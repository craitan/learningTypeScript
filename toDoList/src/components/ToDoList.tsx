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
        <div className="flex w-full justify-center mt-5">
            <div className="border rounded-xl mx-5 w-1/2" id="to-do-tasks">
                <div className="flex justify-center" id="to-do-title">
                    <h1 className="text-2xl">To Do List</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task name</th>
                                <th>Job</th>
                                <th>End Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toDoTasks.map((task, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{task.taskName}</td>
                                    <td>
                                        <label htmlFor={`my_modal_${index}`} className="truncate w-24 inline-block whitespace-nowrap">
                                            {task.taskContent}
                                        </label>
                                        <input type="checkbox" id={`my_modal_${index}`} className="modal-toggle hidden" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box break-all">
                                                <h3 className="text-lg font-bold">To do:</h3>
                                                <p className="py-4">{task.taskContent}</p>
                                            </div>
                                            <label className="modal-backdrop" htmlFor={`my_modal_${index}`}>Close</label>
                                        </div>
                                    </td>
                                    <td>{task.taskEnd}</td>
                                    <td>
                                        <button className="btn btn-sm">Done</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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