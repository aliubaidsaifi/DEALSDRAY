import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Paging.css'

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [courses, setCourses] = useState([]); 
    const [img, setImg] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        const emp = storedEmployees.find(emp => emp.id === parseInt(id));
        if (emp) {
            setEmployee(emp);
            setName(emp.name);
            setEmail(emp.email);
            setMobile(emp.mobile);
            setDesignation(emp.designation);
            setGender(emp.gender);
            setCourses(emp.courses || []);
            setImg(emp.img ? new File([new Blob([emp.img], { type: 'image/png' })], 'image.png') : null);
        }
    }, [id]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setCourses(prevCourses =>
            prevCourses.includes(value)
                ? prevCourses.filter(course => course !== value)
                : [...prevCourses, value]
        );
    };

    const validate = () => {
        const errors = {};

        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

        if (!mobile) errors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(mobile)) errors.mobile = 'Mobile number must be 10 digits';

        if (!designation) errors.designation = 'Designation is required';
        if (!gender) errors.gender = 'Gender is required';
        if (courses.length === 0) errors.courses = 'At least one course must be selected';
        if (img && !['image/jpeg', 'image/png'].includes(img.type)) errors.img = 'Only jpg or png files are allowed';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedEmployee = {
                ...employee,
                name,
                email,
                mobile,
                designation,
                gender,
                courses, 
                img: reader.result, 
                createDate: employee.createDate 
            };

            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            const index = storedEmployees.findIndex(emp => emp.id === parseInt(id));
            if (index !== -1) {
                storedEmployees[index] = updatedEmployee;
                localStorage.setItem('employees', JSON.stringify(storedEmployees));
                alert('Employee updated successfully!');
                navigate('/employee-list'); 
            }
        };

        if (img) {
            reader.readAsDataURL(img); 
        } else {
            reader.onloadend();
        }
    };

    if (!employee) return <p>Loading...</p>;

    return (
        <>
        <Navbar/>
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Edit Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mobile No:</label>
                    <input 
                        type="text" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Designation:</label>
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.designation && <p className="text-red-500">{errors.designation}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Gender:</label>
                    <div className="flex">
                        <label className="inline-flex items-center mr-4">
                            <input 
                                type="radio" 
                                value="Male" 
                                checked={gender === 'Male'} 
                                onChange={(e) => setGender(e.target.value)} 
                                className="form-radio"
                            />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input 
                                type="radio" 
                                value="Female" 
                                checked={gender === 'Female'} 
                                onChange={(e) => setGender(e.target.value)} 
                                className="form-radio"
                            />
                            <span className="ml-2">Female</span>
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Course:</label>
                    <div className="flex flex-wrap">
                        <label className="inline-flex items-center mr-4">
                            <input 
                                type="checkbox" 
                                value="MCA" 
                                checked={courses.includes('MCA')} 
                                onChange={handleCheckboxChange} 
                                className="form-checkbox"
                            />
                            <span className="ml-2">MCA</span>
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input 
                                type="checkbox" 
                                value="BCA" 
                                checked={courses.includes('BCA')} 
                                onChange={handleCheckboxChange} 
                                className="form-checkbox"
                            />
                            <span className="ml-2">BCA</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                value="BSC" 
                                checked={courses.includes('BSC')} 
                                onChange={handleCheckboxChange} 
                                className="form-checkbox"
                            />
                            <span className="ml-2">BSC</span>
                        </label>
                    </div>
                    {errors.courses && <p className="text-red-500">{errors.courses}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Upload Image:</label>
                    <input 
                        type="file" 
                        accept=".jpg, .jpeg, .png" 
                        onChange={(e) => setImg(e.target.files[0])} 
                        className="p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.img && <p className="text-red-500">{errors.img}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
            </form>
        </div>
        </>
    );
};

export default EditEmployee;
