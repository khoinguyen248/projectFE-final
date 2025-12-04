import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getMyJobs } from '../api';

const EmployeeJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await getMyJobs();
            setJobs(response.data.data || response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
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
                        }}>My Jobs</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>View your assigned tasks</p>
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
                    <div className="searchbar" style={{ marginTop: '20px' }}>
                        <div className="searchbar1" style={{ position: 'relative', height: '50px' }}>
                            <input type="text" placeholder="Search jobs..." style={{
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
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '24px',
                            color: 'rgba(162, 161, 168, 1)',
                            display: 'grid',
                            gridTemplateColumns: '300px 400px 150px 120px',
                            gap: '10px'
                        }}>
                            <p>Job Name</p>
                            <p>Description</p>
                            <p>Deadline</p>
                            <p>Status</p>
                        </div>
                        <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

                        {loading && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>Loading...</p>}
                        {!loading && jobs.length === 0 && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>No jobs assigned</p>}
                        {!loading && jobs.map(job => (
                            <div key={job._id}>
                                <div className='boxcontent-1' style={{
                                    alignItems: 'center',
                                    display: 'grid',
                                    gridTemplateColumns: '300px 400px 150px 120px',
                                    gap: '10px'
                                }}>
                                    <p style={{ fontSize: '14px', fontWeight: '500' }}>{job.jobName}</p>
                                    <p style={{ fontSize: '13px' }}>{job.description}</p>
                                    <p style={{ fontSize: '13px' }}>
                                        {new Date(job.deadline).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor:
                                                job.status === 'Completed' ? 'rgba(63, 194, 138, 0.1)' :
                                                    job.status === 'In Progress' ? 'rgba(239, 190, 18, 0.1)' :
                                                        'rgba(113, 82, 243, 0.1)',
                                            color:
                                                job.status === 'Completed' ? 'rgba(63, 194, 138, 1)' :
                                                    job.status === 'In Progress' ? 'rgba(239, 190, 18, 1)' :
                                                        'rgba(113, 82, 243, 1)',
                                            borderRadius: '5px',
                                            fontSize: '12px'
                                        }}>
                                            {job.status}
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

export default EmployeeJobs;
