import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
    const username = localStorage.getItem('username');

    return (
        <>
        <Navbar/>
        <div className="flex flex-col min-h-screen bg-gray-100">
           
            <main className="flex-grow p-6">
                <h2 className="text-2xl font-bold">Welcome, {username}</h2>
            </main>
        </div>
        </>
    );
};

export default Dashboard;
