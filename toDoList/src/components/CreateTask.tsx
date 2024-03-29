import { useContext, useState } from "react";
import { addTask } from "../services/user-service";
import AppContext from "../context/AppContext";

type CreateTaskProps = {
    toggleCreateMode: () => void;
}

const CreateTask = ({ toggleCreateMode }: CreateTaskProps) => {

    const { userData } = useContext(AppContext)

    const [taskForm, setTaskForm] = useState({
        taskName: '',
        taskContent: '',
        taskEnd: '',
        important: false
    });


    const handleChange = (prop: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setTaskForm({
            ...taskForm,
            [prop]: value
        });
    }


    const handleCreateTask = () => {
        if (!userData) {
            console.error('User data is not available');
            return;
        }

        addTask(userData.username, taskForm.taskName, taskForm.taskContent, taskForm.taskEnd, taskForm.important)

        setTaskForm({
            taskName: '',
            taskContent: '',
            taskEnd: '',
            important: false
        })
    }

    return (
        <div className="relative w-full flex flex-col  justify-center ">
            <div className="w-full p-6 m-auto bg-gray rounded-md shadow-2xl ring-1 ring-white lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center">Create a Task</h1>
                <div className="mb-5">
                    <label htmlFor="input-title">Task name:</label>
                    <input placeholder="Task name here" className="w-full input input-bordered" value={taskForm.taskName} onChange={handleChange('taskName')} type="text" name="input-title" />
                </div>

                <div className="mb-5">
                    <label htmlFor="input-content">Content:</label>
                    <br />
                    <textarea placeholder="Content" className="textarea textarea-bordered textarea-sm w-full" value={taskForm.taskContent} onChange={handleChange('taskContent')} name="input-content" id="input-content"></textarea>
                </div>

                <div className="flex flex-col">
                    <div>
                        <label htmlFor="input-date">Due date:</label>
                    </div>
                    <div className="flex flex-row justify-between">
                        <input type="date" className="input input-bordered" value={taskForm.taskEnd} onChange={handleChange('taskEnd')} name="input-date" id="input-date" />
                        <div className="flex items-center">
                            <input type="checkbox" className="checkbox" checked={taskForm.important} onChange={handleChange('important')} name="input-important" id="input-important" />
                            <label htmlFor="input-important">Important</label>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-between">
                    <button className="btn btn-primary" onClick={handleCreateTask} >Create Task</button>
                    <button className="btn btn-secondary" onClick={toggleCreateMode} >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTask; 