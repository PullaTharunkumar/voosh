import React, { useState, useEffect } from 'react'
import auth from '../auth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function ViewTask() {
    const [ task, setTask ] = useState({});
    let location = useLocation();
    
    useEffect( () => {
        const taskDetails = async() => {
            try {
                const config = auth()
                const task = await axios.get(`http://localhost:8080/api/tasks/${location.pathname.split('/').at(-1)}`, config);
                setTask(task.data)
                console.log(task.data);
            } catch (error) {
                console.error('Error getting while fetching Task Details',error);
            }
        }
        taskDetails()
    },[])

  return (
    <div>
        <form>
            <h2> Task Details </h2>
            <span>Title : {task.title} </span>
            <p>Description : {task.description} </p>
            <span>Created at : {task.creationDate} </span>
        </form>
    </div>
  )
}
