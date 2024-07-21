const tasks = [];

const addTask = (task) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const min = currentDate.getMinutes();
  const sec = currentDate.getSeconds();

  const creationDate = `${day > 10 ? day : ('0' + day)}/${month > 10 ? month : ('0' + month)}/${year > 10 ? year : ('0' + year)}, ${hours > 10 ? hours : '0' + hours}:${min > 10 ? min : '0' + min}:${sec > 10 ? sec : '0' + sec}`

  const newTask = { ...task, id: Date.now(), creationDate };
  tasks.push(newTask);
  return newTask;
};

const getTasks = () => {
  return tasks;
};

const deleteTask = (id, res) => {
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    const deleteUser = tasks.splice(index, 1);
    return res.status(204).json(deleteUser);
  } else {
    return res.status(404).json({ message: 'Task Id not found' });
  }
}

const getTask = (id, res) => {
  const task = tasks.filter(task => task.id === parseInt(id));
  if (task) {
    return task[0]
  } else {
    return res.status(404).json({ message: 'Task Id not found' });
  }
}

const updateTask = (data, res) => {
  const index = tasks?.findIndex(task => task.id === parseInt(data.id));
  if (index !== -1) {
    data?.title ? tasks[index].title = data?.title : null;
    data?.description ? tasks[index].description = data?.description : null;
    data?.status ? tasks[index].status = data?.status : null;
    return res.json(tasks[index]);
  } else {
    return res.status(404).json({ message: 'Task Id not found' });
  }
}

module.exports = { addTask, getTasks, deleteTask, getTask, updateTask };
