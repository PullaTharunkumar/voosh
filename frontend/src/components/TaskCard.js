import React from 'react';
import axios from 'axios';
import auth from '../auth';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const TaskCard = (props) => {
    const { task, tasks, setTasks } = props

    const navigate = useNavigate();

    const deleteCard = async () => {
        try{
            const config = auth()
            await axios.delete('http://localhost:8080/api/tasks/'+task.id, config);
            const updateTasks = tasks.filter(item => item.id !== task.id)
            setTasks(updateTasks)
        }catch(error){
            console.error('Error getting while deleting the Task',error);
        }
    }

    const editCard = () => {
        navigate(`/edit/${task.id}`)
    }

    const taskDetails = () => {
        navigate(`/task-details/${task.id}`)
    }

    const [{  }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }));

    return (
        <li className="task-card" ref={drag}>
            <h3>Title : {task.title}</h3>
            <p> Description : {task.description}</p>
            <span> Created at : {task.creationDate}</span>
            <div className='card-btns'>
                <button id='delete-btn' onClick={deleteCard}> Delete </button>
                <button id='edit-btn' onClick={editCard}> Edit </button>
                <button id='view-btn' onClick={taskDetails}> View Details </button>
            </div>
        </li>
    );
};

export default TaskCard;
