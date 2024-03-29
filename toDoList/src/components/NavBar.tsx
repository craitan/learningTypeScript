import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { logoutUser } from "../services/auth-service";
import { Task } from "./ToDoList";
import { checkEndDates } from "../services/user-service";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

    const { user, setContext } = useContext(AppContext)
    const [endingSoon, setEndingSoon] = useState<Task[]>([]);
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        setContext({ user: null, userData: null })
    };

    useEffect(() => {
        if (!userData) {
            return;
        }
        checkEndDates(userData?.username, setEndingSoon);
    }, [userData]);


    console.log(endingSoon);

    return (
        <div className="navbar bg-base-100 shadow shadow-white justify-between">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">ToDo List</a>
            </div>
            <div id="log-in-log-out" className="">
                {user ? (
                    <div className="flex">
                        <div className="dropdown dropdown-bottom dropdown-end mr-5">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    {endingSoon.length > 0 && <span className="badge badge-xs badge-primary indicator-item"></span>}
                                </div>
                            </div>
                            <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border">
                                <div id="text-if-tasks-end-soon">
                                    {endingSoon.length === 0 ? (<p>No tasks ending soon.</p>) : (<p>Tasks that ends tomorrow:</p>)}
                                </div>
                                <hr className="my-2" />
                                <div id="ending-soon-tasks">
                                    {endingSoon.map((task, index) =>
                                        <div key={index} className="mb-2">
                                            <p>{`${index + 1}. ${task.taskName}`}</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        <div id="sign-button">
                            <button className="btn btn-secondary" onClick={handleLogout}>Sign Out</button>
                        </div>
                    </div>
                ) : (
                    <div className="mr-5">
                        <button className="btn btn-accent" onClick={() => navigate('/login')}>Sign In</button>
                    </div>)
                }
            </div>
        </div>
    );
};




export default NavBar;