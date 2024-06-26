import { set, ref, query, equalTo, push, orderByChild, onValue, get, remove } from 'firebase/database';
import { db } from '../config/firebase-config';


export const createUser = (username: string, firstName: string, lastName: string, uid: string, email: string) => {

    return set(ref(db, `users/${username}`), {
        username,
        firstName,
        lastName,
        uid,
        email,
        createdOn: new Date().toString(),
        toDo: {},
        done: {}
    })

};

export const getUserData = (uid: string) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
}

export const getUserByUserName = (username: string, callback: (snapshot: any) => void) => {
    const userRef = ref(db, `users/${username}`);
    onValue(userRef, (snapshot) => {
        callback(snapshot.val());
    });
};

export const addTask = (username: string, taskName: string, taskContent: string, taskEnd: string, important: boolean) => {
    const tasksRef = ref(db, `users/${username}/toDo`);

    return push(tasksRef, {
        taskName,
        taskContent,
        taskStart: new Date().toString(),
        taskEnd,
        done: false,
        important,
    });
};

export const watchUserTasks = (username: string, callback: (tasks: any[]) => void) => {
    const tasksRef = ref(db, `users/${username}/toDo`);
    onValue(tasksRef, (snapshot) => {
        const tasks = snapshot.val();
        const tasksList = Object.keys(tasks || {}).map(key => ({ ...tasks[key], id: key }));

        tasksList.sort((a, b) => {

            if (a.important && !b.important) {
                return -1;
            }
            if (!a.important && b.important) {
                return 1;
            }
            return new Date(a.taskEnd).getTime() - new Date(b.taskEnd).getTime();
        });

        callback(tasksList);
    });
};


export const watchUserDoneTasks = (username: string, callback: (tasks: any[]) => void) => {
    const tasksRef = ref(db, `users/${username}/done`);
    onValue(tasksRef, (snapshot) => {
        const tasks = snapshot.val();
        const tasksList = Object.keys(tasks || {}).map(key => ({ ...tasks[key], id: key }));
        callback(tasksList);
    });
}


export const markAsDone = (username: string, taskId: string) => {
    const doneTaskRef = ref(db, `users/${username}/done`);
    const toDoTaskRef = ref(db, `users/${username}/toDo/${taskId}`);

    get(toDoTaskRef).then((snapshot) => {
        const task = snapshot.val();
        push(doneTaskRef, task);
        remove(toDoTaskRef);
    });
};


export const deleteTask = (username: string, taskId: string) => {
    const taskRef = ref(db, `users/${username}/done/${taskId}`);
    return remove(taskRef);
};


export const checkEndDates = (username: string, callback: (tasks: any[]) => void) => {
    const tasksRef = ref(db, `users/${username}/toDo`);
    onValue(tasksRef, (snapshot) => {
        const tasks = snapshot.val();
        const tasksList = Object.keys(tasks || {}).map(key => ({ ...tasks[key], id: key }));

        const today = new Date();

        const tasksToUpdate = tasksList.filter(task => {
            const taskEndDate = new Date(task.taskEnd);
            return taskEndDate.getFullYear() === today.getFullYear() &&
                   taskEndDate.getMonth() === today.getMonth() &&
                   taskEndDate.getDate() === today.getDate() &&
                   !task.done;
        });

        callback(tasksToUpdate);
    });
};