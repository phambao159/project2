import { JSX, useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onLogin: (token: string) => void;
}

function Login({ onLogin }: LoginProps): JSX.Element {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    });
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            navigate('/');
            return;
        }
    }, [navigate])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin(prev => ({ ...prev, [name]: value }));
    }
    const fetchLogin = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formLogin)
            })
            const json = await res.json();
            if (res.ok) {
                const token = json.access_token;
                localStorage.setItem('jwt_token', token);
                onLogin(token);
                navigate("/");
            } else {
                alert(json.message);
                return;
            }
        } catch (error) {
            console.log("Error fetch login:", error);
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formLogin.username || !formLogin.password) {
            alert("Please enter username and password");
            return;
        }
        fetchLogin();
    }
    return (
        <div className="login bg-gray-100 min-h-screen flex items-center">
            <div className="w-full bg-white  max-w-md mx-auto shadow-xl rounded-xl p-8">
                <h2 className="font-bold text-3xl text-blue-700 text-center mb-4">Login</h2>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block mb-1">Username</label>
                        <input type="text" name="username" placeholder="Enter your username" className="w-full p-2 border border-gray-200 rounded w-2/3" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" className="w-full p-2 border border-gray-200 rounded w-2/3" onChange={handleChange} />
                    </div>
                    <div className="mt-5">
                        <input type="submit" value="Log in" className="w-full px-2 py-2 bg-blue-600 text-white rounded mb-4 hover:bg-blue-700 hover:cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;