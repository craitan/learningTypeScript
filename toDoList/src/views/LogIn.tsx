import { useContext, useEffect, useState } from "react";
import { loginUser } from "../services/auth-service";
import AppContext from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";


// interface FireBaseError {
//     code: string;
// }

const LogIn = () => {

    const { user, setContext } = useContext(AppContext)

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const updateForm = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    }
    
    useEffect(() => {
        if (user) {
            navigate(location.state?.from.pathname || '/');
        }
    }, [user, location.state?.from.pathname, navigate]);

    const login = async () => {
        try {
            await loginUser(form.email, form.password);
            setContext({ user: user, userData: null });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" value={form.email} onChange={updateForm('email')} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" value={form.password} onChange={updateForm('password')} className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;