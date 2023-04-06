import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server_url } from '../main';
import { toast } from 'react-hot-toast';
import Todoitem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [refresh, setRefresh] = useState(false)

    const { isAuthenticated } = useContext(Context);

    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(`${server_url}/task/${id}`, {}, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)

        }

    }
    const deleteHandler = async (id) => {

        try {
            const { data } = await axios.delete(`${server_url}/task/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server_url}/task/new`, {
                title, description
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(data.message)
            setLoading(false);
            setTitle("")
            setDescription("")
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get(`${server_url}/task/my`, {
            withCredentials: true,
        }).then(res => {
            setTasks(res.data.tasks)
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }, [refresh])

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <div className='container'>
            <div className='login'>
                <section>
                    <form onSubmit={submitHandler}>
                        <input
                            type='text'
                            placeholder='Title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button disabled={loading} type='submit'>Add Task</button>
                    </form>
                </section>
            </div>
            <section className='todosContainer'>
                {
                    tasks.map(task => (
                        <Todoitem
                            title={task.title}
                            description={task.description}
                            isCompleted={task.isCompleted}
                            updateHandler={updateHandler}
                            deleteHandler={deleteHandler}
                            id={task._id}
                            key={task._id} />
                    ))
                }
            </section>
        </div>
    )
}

export default Home