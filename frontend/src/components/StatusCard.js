import React from 'react'
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

export default function StatusCard(props) {
    const { tasks, status, setTasks, onDrop } =props
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, status, tasks),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div className="column" ref={drop} style={{ backgroundColor: isOver ? '#e0e0e0' : '#f0f0f0' }}>
            <h2>{status.toUpperCase()}</h2>
            <ul className="task-list">
            {tasks.filter(task => task.status === status).map(task => (
                <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
            ))}
            </ul>
        </div>
    )
}
