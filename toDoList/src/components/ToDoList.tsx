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


const ToDoList = ({ userData }: ToDoListProps) => {

    
    return (
        <div className="flex justify-between mt-5">
            <div className="border">
                <h1 className="text-2xl">To Do List</h1>
                <div>
                    List of the tasks you need to do
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