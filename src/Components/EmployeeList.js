import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './Paging.css'
import Navbar from './Navbar';

const EmployeeList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [sortColumn, setSortColumn] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (sortColumn === 'createDate') {
            return sortOrder === 'asc'
                ? new Date(a.createDate) - new Date(b.createDate)
                : new Date(b.createDate) - new Date(a.createDate);
        }
        if (sortOrder === 'asc') {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    });

    const pageCount = Math.ceil(sortedEmployees.length / itemsPerPage);
    const displayedEmployees = sortedEmployees.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSort = (column) => {
        setSortColumn(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleDelete = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    return (
      <>
      <Navbar/>
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Employee List</h1>

            <div className="mb-4 flex justify-between items-center">
                <Link to="/create-employee" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Employee</Link>
                <input 
                    type="text" 
                    placeholder="Search Employees" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <p className="text-lg font-semibold">Total Employees: {sortedEmployees.length}</p>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="w-full bg-gray-200 border-b">
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('id')}>
                            Unique ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left">Image</th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortColumn === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('mobile')}>
                            Mobile No {sortColumn === 'mobile' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('designation')}>
                            Designation {sortColumn === 'designation' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('gender')}>
                            Gender {sortColumn === 'gender' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('courses')}>
                            Course {sortColumn === 'courses' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => handleSort('createDate')}>
                            Create Date {sortColumn === 'createDate' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedEmployees.length > 0 ? (
                        displayedEmployees.map(employee => (
                            <tr key={employee.id} className="border-b">
                                <td className="py-2 px-4">{employee.id}</td>
                                <td className="py-2 px-4">
                                    {employee.img ? (
                                        <img src={employee.img} alt={employee.name} className="w-16 h-16 object-cover rounded-full" />
                                    ) : (
                                        <p>No image</p>
                                    )}
                                </td>
                                <td className="py-2 px-4">{employee.name}</td>
                                <td className="py-2 px-4">{employee.email}</td>
                                <td className="py-2 px-4">{employee.mobile}</td>
                                <td className="py-2 px-4">{employee.designation}</td>
                                <td className="py-2 px-4">{employee.gender}</td>
                                <td className="py-2 px-4">
                                    {employee.courses && employee.courses.length > 0 ? (
                                        employee.courses.join(', ')
                                    ) : 'Not specified'}
                                </td>
                                <td className="py-2 px-4">{new Date(employee.createDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <Link to={`/edit-employee/${employee.id}`} className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(employee.id)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="py-2 px-4 text-center">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
        </>
    );
};

export default EmployeeList;
