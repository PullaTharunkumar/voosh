import React, { useState, useEffect } from 'react';
import axios from 'axios';
import auth from '../auth';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StatusCard from './StatusCard';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const navigate = useNavigate();

    const fetchTasks = async () => {
        try{
            const config = auth()
            const res = await axios.get('http://localhost:8080/api/tasks', config);
            setTasks(res.data);
            return res.data
        }catch(error){
            console.error('Error getting while fetching Tasks',error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    const createTask = () => {
        navigate('add-task')
    }
    const handleDrop = async (taskId, newStatus) => {
        try{
            const config = auth()
            await axios.put('http://localhost:8080/api/tasks/'+taskId, { status:newStatus }, config);
        }catch(error){
            console.error('Error getting while updating Task State', error);
        }   
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus} : task)
        );
    };

    const searchFun = async(value) =>{
        setSearch(value)
        const data = await fetchTasks()
        const filteredTasks = data.filter(task => task.title.includes(value))
        setTasks(filteredTasks)
    }

    const sortFun = async(value) =>{
        setSort(value)
        const data = await fetchTasks()
        let filteredTasks = []
        value === 'all' ? filteredTasks = data : filteredTasks = data.slice(data.length-10,data.length)
        setTasks(filteredTasks)
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className='body'>
                    <div className='btn-div'>
                        <button className="btn" onClick={createTask}>Add Task</button>
                        <div className='search-sort'>
                            <div>
                                <span>Search : </span>
                                <input placeholder='Search...' name='search' onChange={(e) => searchFun(e.target.value)}></input>
                            </div>
                            <div>
                                <span> Sort By : </span>
                                <select onChange={(e) => sortFun(e.target.value)}>
                                    <option value={'all'}>All</option>
                                    <option value={'recent'}>Recent</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='task-board'>
                        <StatusCard tasks={tasks} status={'todo'} onDrop={handleDrop} setTasks={setTasks} />
                        <StatusCard tasks={tasks} status={'in-progress'} onDrop={handleDrop} setTasks={setTasks} />
                        <StatusCard tasks={tasks} status={'done'} onDrop={handleDrop} setTasks={setTasks} />
                    </div>
                </div>
            </DndProvider>
        </>
    );
};

export default TaskBoard;
