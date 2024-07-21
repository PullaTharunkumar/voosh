import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskBoard from './components/TaskBoard';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute'
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
              <Route element={<PrivateRoute/>}>
                  <Route path="/" element={<TaskBoard  />} />
                  <Route path="/add-task" element={<AddTask action={'add'}/>} />
                  <Route path="/edit/:id" element={<AddTask action={'edit'}/>} />
                  <Route path="/task-details/:id" element={<ViewTask/>} />
                </Route>
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
