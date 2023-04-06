import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server_url } from '../main'
import { toast } from 'react-hot-toast'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${server_url}/users/new`,
                {
                    name, email, password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )
            console.log(name, email, password);
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error("Error");
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }
    if (isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        type='text'
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Sign Up</button>
                    <h4>OR</h4>
                    <Link to="/login">Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Register