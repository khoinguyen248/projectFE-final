import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getAllSchedules, createSchedule, deleteSchedule, getMySchedule } from '../api';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState({
        workDate: '',
        shiftName: 'Morning',
        startTime: '',
        endTime: ''
    });
    const [role, setRole] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('account'));
        if (user) {
            setRole(user.role);
            fetchSchedules(user.role);
        }
    }, []);

    const fetchSchedules = async (userRole) => {
        try {
            let response;
            if (userRole === 'Admin' || userRole === 'Manager') {
                response = await getAllSchedules();
            } else {
                response = await getMySchedule();
            }
            setSchedules(response.data.data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createSchedule(newSchedule);
            alert('Schedule created!');
            setNewSchedule({ workDate: '', shiftName: 'Morning', startTime: '', endTime: '' });
            fetchSchedules(role);
        } catch (error) {
            console.error("Error creating schedule:", error);
            alert('Failed to create schedule: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteSchedule(id);
                fetchSchedules(role);
            } catch (error) {
                console.error("Error deleting schedule:", error);
            }
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
                        }}>Schedule Management</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>Manage work schedules</p>
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
                    {(role === 'Admin' || role === 'Manager') && (
                        <div className="searchbar" style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <div style={{
                                padding: '20px',
                                border: '1px solid rgba(162, 161, 168, 0.1)',
                                borderRadius: '10px',
                                backgroundColor: 'white'
                            }}>
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '15px',
                                    fontFamily: 'lexend'
                                }}>Create New Schedule</p>
                                <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <input
                                        type="date"
                                        required
                                        value={newSchedule.workDate}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, workDate: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            minWidth: '150px'
                                        }}
                                    />
                                    <select
                                        value={newSchedule.shiftName}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, shiftName: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            minWidth: '120px'
                                        }}
                                    >
                                        <option value="Morning">Morning</option>
                                        <option value="Afternoon">Afternoon</option>
                                        <option value="Night">Night</option>
                                    </select>
                                    <input
                                        type="time"
                                        required
                                        placeholder="Start Time"
                                        value={newSchedule.startTime}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            minWidth: '120px'
                                        }}
                                    />
                                    <input
                                        type="time"
                                        required
                                        placeholder="End Time"
                                        value={newSchedule.endTime}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            minWidth: '120px'
                                        }}
                                    />
                                    <button type="submit" style={{
                                        backgroundColor: 'rgba(113, 82, 243, 1)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0 30px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '300'
                                    }}>Create</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="boxcontent">
                        <div className='boxcontent-1' style={{
                            fontSize: '16px',
                            fontWeight: '300',
                            lineHeight: '24px',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>
                            <p style={{ width: '200px', textAlign: 'left' }}>Date</p>
                            <p style={{ width: '150px', textAlign: 'left' }}>Shift</p>
                            <p style={{ width: '150px', textAlign: 'left' }}>Start Time</p>
                            <p style={{ width: '150px', textAlign: 'left' }}>End Time</p>
                            <p style={{ width: '200px', textAlign: 'left' }}>Created By</p>
                            {(role === 'Admin' || role === 'Manager') && <p>Action</p>}
                        </div>
                        <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

                        {schedules.length === 0 && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>No schedules</p>}
                        {schedules.map(sch => (
                            <div key={sch._id}>
                                <div className='boxcontent-1' style={{ alignItems: 'center' }}>
                                    <p style={{ width: '200px', textAlign: 'left' }}>{new Date(sch.workDate).toLocaleDateString()}</p>
                                    <p style={{ width: '150px', textAlign: 'left' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: 'rgba(113, 82, 243, 0.1)',
                                            color: 'rgba(113, 82, 243, 1)',
                                            borderRadius: '5px',
                                            fontSize: '12px'
                                        }}>{sch.shiftName}</span>
                                    </p>
                                    <p style={{ width: '150px', textAlign: 'left' }}>{sch.startTime}</p>
                                    <p style={{ width: '150px', textAlign: 'left' }}>{sch.endTime}</p>
                                    <p style={{ width: '200px', textAlign: 'left' }}>
                                        {sch.createdBy ? `${sch.createdBy.fname} ${sch.createdBy.lname}` : 'Unknown'}
                                    </p>
                                    {(role === 'Admin' || role === 'Manager') && (
                                        <button onClick={() => handleDelete(sch._id)} style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}>Delete</button>
                                    )}
                                </div>
                                <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
