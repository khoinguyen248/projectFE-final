import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getMySalary, upsertSalary, getAllemloyees } from '../api';

const Salary = () => {
    const [salary, setSalary] = useState(null);
    const [role, setRole] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [salaryForm, setSalaryForm] = useState({
        employeeId: '',
        baseSalary: '',
        bonus: '',
        deduction: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('account'));
        if (user) {
            setRole(user.role);
            if (user.role === 'Admin' || user.role === 'Manager') {
                fetchAllEmployees();
            } else {
                fetchMySalary();
            }
        }
    }, []);

    const fetchMySalary = async () => {
        try {
            const response = await getMySalary();
            setSalary(response.data.data);
        } catch (error) {
            console.error("Error fetching salary:", error);
        }
    };

    const fetchAllEmployees = async () => {
        try {
            const response = await getAllemloyees();
            setEmployees(response.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleUpsert = async (e) => {
        e.preventDefault();
        try {
            await upsertSalary(salaryForm);
            alert('Salary updated successfully!');
            setSalaryForm({ employeeId: '', baseSalary: '', bonus: '', deduction: '' });
            setSelectedEmployee('');
        } catch (error) {
            console.error("Error updating salary:", error);
            alert('Failed to update salary');
        }
    };

    return (
        <div className='cha'>
            <div className='con'>
                <div className='header'>
                    <div className='header-1'>
                        <p style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            lineHeight: '30px',
                            textAlign: 'left',
                            fontFamily: 'lexend'
                        }}>Salary Information</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>View and manage employee salaries</p>
                    </div>

                    <div className='header-2' style={{
                        position: 'relative',
                        height: '50px',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <input type="text" style={{
                            border: '1px solid rgba(162, 161, 168, 0.1)',
                            paddingLeft: '40px',
                            height: '50px'
                        }} />
                        <label htmlFor="" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '20px',
                            transform: 'translateY(-50%)'
                        }}><CiSearch size={24} /></label>
                        <button style={{
                            borderRadius: '10px',
                            backgroundColor: 'rgba(162, 161, 168, 0.1)'
                        }}><CiBellOn size={24} /></button>
                    </div>
                </div>

                <div className='inforbox'>
                    {role === 'Employee' ? (
                        <div className="searchbar" style={{ marginTop: '20px' }}>
                            {salary ? (
                                <div style={{
                                    padding: '30px',
                                    border: '1px solid rgba(162, 161, 168, 0.1)',
                                    borderRadius: '10px',
                                    backgroundColor: 'white'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '25px',
                                        fontFamily: 'lexend'
                                    }}>Your Salary Details</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div style={{
                                            padding: '20px',
                                            backgroundColor: 'rgba(113, 82, 243, 0.05)',
                                            borderRadius: '10px'
                                        }}>
                                            <p style={{
                                                fontSize: '12px',
                                                color: 'rgba(162, 161, 168, 1)',
                                                marginBottom: '8px'
                                            }}>Base Salary</p>
                                            <p style={{
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                margin: 0,
                                                color: 'rgba(113, 82, 243, 1)'
                                            }}>${salary.baseSalary}</p>
                                        </div>

                                        <div style={{
                                            padding: '20px',
                                            backgroundColor: 'rgba(63, 194, 138, 0.05)',
                                            borderRadius: '10px'
                                        }}>
                                            <p style={{
                                                fontSize: '12px',
                                                color: 'rgba(162, 161, 168, 1)',
                                                marginBottom: '8px'
                                            }}>Bonus</p>
                                            <p style={{
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                margin: 0,
                                                color: 'rgba(63, 194, 138, 1)'
                                            }}>${salary.bonus}</p>
                                        </div>

                                        <div style={{
                                            padding: '20px',
                                            backgroundColor: 'rgba(244, 91, 105, 0.05)',
                                            borderRadius: '10px'
                                        }}>
                                            <p style={{
                                                fontSize: '12px',
                                                color: 'rgba(162, 161, 168, 1)',
                                                marginBottom: '8px'
                                            }}>Deduction</p>
                                            <p style={{
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                margin: 0,
                                                color: 'rgba(244, 91, 105, 1)'
                                            }}>${salary.deduction}</p>
                                        </div>

                                        <div style={{
                                            padding: '20px',
                                            backgroundColor: 'rgba(239, 190, 18, 0.05)',
                                            borderRadius: '10px'
                                        }}>
                                            <p style={{
                                                fontSize: '12px',
                                                color: 'rgba(162, 161, 168, 1)',
                                                marginBottom: '8px'
                                            }}>Net Salary</p>
                                            <p style={{
                                                fontSize: '24px',
                                                fontWeight: '600',
                                                margin: 0,
                                                color: 'rgba(239, 190, 18, 1)'
                                            }}>${salary.baseSalary + salary.bonus - salary.deduction}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)' }}>No salary information available</p>
                            )}
                        </div>
                    ) : (
                        <div className="searchbar" style={{ marginTop: '20px' }}>
                            <div style={{
                                padding: '30px',
                                border: '1px solid rgba(162, 161, 168, 0.1)',
                                borderRadius: '10px',
                                backgroundColor: 'white'
                            }}>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '20px',
                                    fontFamily: 'lexend'
                                }}>Manage Employee Salary</p>

                                <form onSubmit={handleUpsert} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                                    <select
                                        required
                                        value={selectedEmployee}
                                        onChange={(e) => {
                                            setSelectedEmployee(e.target.value);
                                            setSalaryForm({ ...salaryForm, employeeId: e.target.value });
                                        }}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '45px',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map(emp => (
                                            <option key={emp._id} value={emp._id}>
                                                {emp.fname} {emp.lname} ({emp.email})
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Base Salary"
                                        required
                                        value={salaryForm.baseSalary}
                                        onChange={(e) => setSalaryForm({ ...salaryForm, baseSalary: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '45px',
                                            borderRadius: '10px'
                                        }}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Bonus"
                                        value={salaryForm.bonus}
                                        onChange={(e) => setSalaryForm({ ...salaryForm, bonus: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '45px',
                                            borderRadius: '10px'
                                        }}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Deduction"
                                        value={salaryForm.deduction}
                                        onChange={(e) => setSalaryForm({ ...salaryForm, deduction: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '45px',
                                            borderRadius: '10px'
                                        }}
                                    />

                                    <button type="submit" style={{
                                        backgroundColor: 'rgba(113, 82, 243, 1)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '300'
                                    }}>Update Salary</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Salary;
