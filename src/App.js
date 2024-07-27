import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import CreateEmployee from './Components/CreateEmployee';
import  EmployeeList from './Components/EmployeeList';
import EditEmployee from './Components/EditEmployee';




const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/create-employee" element={<CreateEmployee />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
               
            </Routes>
        </Router>
    );
};

export default App;
