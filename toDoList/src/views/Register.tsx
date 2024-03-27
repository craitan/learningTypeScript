import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../services/user-service";
import { registerUser } from "../services/auth-service";


const Register = () => {

    const navigate = useNavigate();

    interface FireBaseError {
        message: string;
    }

    const [form, setForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const register = async () => {

        try {

            const credentials = await registerUser(form.email, form.password);
            await createUser(form.username, form.firstName, form.lastName, credentials.user.uid, form.email);
            navigate('/');
        }
        catch (error: any) {
            if ((error as FireBaseError).message === "Firebase: Error (auth/email-already-in-use).") {
                alert("Email already in use")
            }
        }

    };

    const updateForm = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    }

    return (
        <div className="relative w-full flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-gray border border-amber-950 rounded-md shadow-2xl shad ring-2 ring-white lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Sign Up</h1>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input className="w-full input input-bordered" value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input className="w-full input input-bordered" value={form.firstName} onChange={updateForm('firstName')} type="text" name="firstName" id="firstName" /><br />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input className="w-full input input-bordered" value={form.lastName} onChange={updateForm('lastName')} type="text" name="lastName" id="lastName" /><br />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input className="w-full input input-bordered" value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input className="w-full input input-bordered" value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
                </div>
                <br />
                <div >
                    <button className="btn bg-base-200 w-full" onClick={register}>Register</button>
                </div>
                <br />
                <span className="mr-2">Already have an account?</span>
                <NavLink to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">Log in</NavLink>
            </div>
        </div>
    )

};


export default Register;