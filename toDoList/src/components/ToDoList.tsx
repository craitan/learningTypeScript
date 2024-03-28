type ToDoListProps = {
    userData: {
        name: string;
        email: string;
        uid: string;
        firstName: string;
        lastName: string;
        toDo: object;
        done: object;
    } | null;
};


const ToDoList = ({ userData }: ToDoListProps) => {

    console.log(userData)
    return (
        <div>
            <h1>ToDoList</h1>
        </div>
    );
    
};


export default ToDoList;