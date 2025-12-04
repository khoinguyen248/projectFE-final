import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { checkIn, checkOut, getTimesheets, getMonthlyReport } from '../api';

const Timesheet = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('account'));
        if (user) {
            setRole(user.role);
            fetchTimesheets();
        }
    }, []);

    const fetchTimesheets = async () => {
        try {
            setLoading(true);
            const response = await getTimesheets();
            setTimesheets(response.data.data);
        } catch (error) {
            console.error("Error fetching timesheets:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        try {
            await checkIn({ location: 'Office' });
            alert('Checked In!');
            fetchTimesheets();
        } catch (error) {
            alert('Check-in failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleCheckOut = async () => {
        try {
            await checkOut();
            alert('Checked Out!');
            fetchTimesheets();
        } catch (error) {
            alert('Check-out failed: ' + (error.response?.data?.message || error.message));
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
                        }}>Timesheet</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>Track working hours</p>
                    </div>

                    <div className='header-2' style={{
                        position: 'relative',
                        height: '50px',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <button onClick={handleCheckIn} style={{
                            borderRadius: '10px',
                            backgroundColor: 'rgba(63, 194, 138, 1)',
                            color: 'white',
                            border: 'none',
                            padding: '0 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '300'
                        }}>Check In</button>
                        <button onClick={handleCheckOut} style={{
                            borderRadius: '10px',
                            backgroundColor: 'rgba(239, 190, 18, 1)',
                            color: 'white',
                            border: 'none',
                            padding: '0 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '300'
                        }}>Check Out</button>
                    </div>
                </div>

                <div className='inforbox'>
                    <div className="searchbar" style={{ marginTop: '20px' }}>
                        <div className="searchbar1" style={{ position: 'relative', height: '50px' }}>
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
                        </div>
                    </div>

                    <div className="boxcontent">
                        <div className='boxcontent-1' style={{
                            fontSize: '16px',
                            fontWeight: '300',
                            lineHeight: '24px',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>
                            <p style={{ width: '250px', textAlign: 'left' }}>Employee Name</p>
                            <p style={{ width: '200px', textAlign: 'left' }}>Date</p>
                            <p style={{ width: '150px', textAlign: 'left' }}>Check-in</p>
                            <p style={{ width: '150px', textAlign: 'left' }}>Check-out</p>
                            <p style={{ width: '120px', textAlign: 'left' }}>Total Hours</p>
                            <p style={{ width: '100px', textAlign: 'left' }}>Status</p>
                        </div>
                        <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

                        {loading && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>Loading...</p>}
                        {!loading && timesheets.length === 0 && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>No records</p>}
                        {!loading && timesheets.map(item => (
                            <div key={item._id}>
                                <div className='boxcontent-1' style={{ alignItems: 'center' }}>
                                    <p style={{ width: '250px', textAlign: 'left' }}>
                                        {item.employeeId ? `${item.employeeId.fname} ${item.employeeId.lname}` : 'Unknown'}
                                    </p>
                                    <p style={{ width: '200px', textAlign: 'left' }}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                    <p style={{ width: '150px', textAlign: 'left' }}>
                                        {new Date(item.checkIn).toLocaleTimeString()}
                                    </p>
                                    <p style={{ width: '150px', textAlign: 'left' }}>
                                        {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : '-'}
                                    </p>
                                    <p style={{ width: '120px', textAlign: 'left' }}>
                                        {item.totalHours ? `${item.totalHours}h` : '-'}
                                    </p>
                                    <p style={{ width: '100px', textAlign: 'left' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: item.status === "OnTime" ? 'rgba(63, 194, 138, 0.1)' : 'rgba(244, 91, 105, 0.1)',
                                            color: item.status === "OnTime" ? 'rgba(63, 194, 138, 1)' : 'rgba(244, 91, 105, 1)',
                                            borderRadius: '5px',
                                            fontSize: '12px'
                                        }}>
                                            {item.status || 'Present'}
                                        </span>
                                    </p>
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

export default Timesheet;
