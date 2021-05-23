import { useState } from "react";
import '../assets/css/login.css';
import { useDispatch, useSelector } from "react-redux";
import { login, loading } from "../actions/index";
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const io = useSelector(state => state.io);
    const pageLoading = useSelector(state => state.loading);
    const [payload, setpayload] = useState({ username: '', password: '' });

    const singIn = async () => {
        if (!pageLoading) {
            console.log('payload', payload)
            dispatch(loading(true));
            let data = await fetch('https://glib-shining-biplane.glitch.me/login', {
                method: 'POST',
                body: JSON.stringify({ "username": payload.username, "password": payload.password }),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            data = await data.json();
            if (data.error) {
                dispatch(loading(false));
                toast.error(data.message)
            } else {
                console.log('login',data);
                io.emit('join', { '_id': data.response._id });
                toast.success(data.message)
                dispatch(login({ 'data': data.response, 'login': true }));
            }
        }
    }

    const setValue = (e) => {
        setpayload({ ...payload, [e.target.name]: e.target.value });
    }
    return (
        <div className="login-page">
            <h1>CF</h1>

            <div>
                <input type="text" placeholder="User Name..." name="username" onChange={setValue} value={payload.username} />
            </div>
            <div>
                <input type="password" placeholder="Password..." name="password" onChange={setValue} value={payload.password} />
            </div>
            <div>
                {payload && payload.username && payload.password.length > 5 && <input type="button" value="Sign in" onClick={singIn} />}
                {((payload.username === '' && payload.password.length < 6) || (payload.username === '' || payload.password.length < 6)) && <input className="login-disable" type="button" value="Sign in" />}
                <p>Don't have an account? <a href="/sign-up" className="sing-up-link">Sign up</a></p>
            </div>
        </div>
    )
}

export default Login;