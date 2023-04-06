import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server_url } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await axios.get(
                `${server_url}/users/logout`,
                {
                    withCredentials: true,
                }
            )
            // console.log(data);
            toast.success("Logged Out successfully");
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    }
    return (
        <nav className='header'>
            <div>
                <h2>Todo</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {
                    isAuthenticated
                        ?
                        <button
                            disabled={loading}
                            className='btn'
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                        :
                        <Link to={"/login"}>Login</Link>
                }
            </article>
        </nav>
    )
}

export default Header