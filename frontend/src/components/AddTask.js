import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import auth from '../auth';

export default function AddTask(props) {
  const { action } = props
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const taskDetails = async () => {
      try {
        const taskPathId = location.pathname.split('/').at(-1)
        const config = auth()
        const task = await axios.get('http://localhost:8080/api/tasks/' + taskPathId, config);
        setTaskId(task?.data?.id)
        setTitle(task?.data?.title);
        setDescription(task?.data?.description);
        setStatus(task?.data?.status);
      } catch (error) {
        console.error('Error getting while fetching Task Details',error);
      }
    }
    if(action === 'edit'){ 
      taskDetails() 
    }
  },[])



  const addTask = async (e) => {
    e.preventDefault();
    try {
      const config = auth()
      await axios.post('http://localhost:8080/api/tasks', { title, description, status }, config);
      navigate('/');
    } catch (error) {
      console.error('Error getting while creating Task',error);
    }
  }

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const config = auth()
      await axios.put('http://localhost:8080/api/tasks/'+taskId, { title, description, status }, config);
      navigate('/');
    } catch (error) {
      console.error('Error getting while updating Task Details',error);
    }
  }

  return (
    <div>
      <form onSubmit={action === 'edit' ? updateTask : addTask}>
        <h2> {action === 'edit' ? 'Edit Task' : 'Add Task'} </h2>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select required value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value='todo'>To Do</option>
          <option value='in-progress'>In Progress</option>
          <option value='done'>Done</option>
        </select>
        <button type="submit"> { action === 'edit' ? 'save' : 'Create Task'  } </button>
      </form>
    </div>
  )
}
