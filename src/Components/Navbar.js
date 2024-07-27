import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const username = localStorage.getItem('username');

    const handleLogout = () => {

        const username = localStorage.getItem('username');
        
        localStorage.removeItem('username');
        window.location.href = '/';
    };
  return (
    <header className="bg-blue-600 text-white p-4">
    <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-semibold">Logo</div>
        <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="hover:underline">Home</Link></li>
            <li><Link to="/employee-list" className="hover:underline">Employee List</Link></li>
            <li>{username}</li>
            <li><button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Logout</button></li>
        </ul>
    </nav>
</header>
  )
}

export default Navbar
