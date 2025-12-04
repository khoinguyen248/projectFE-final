import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import './Modal3.css'
import { createJob } from './api';

export const Modal3 = ({ setArr, toogle, arr }) => {

  const [jobName, setJobName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleAddProduct = async () => {
    try {
      const newJob = {
        jobName,
        description,
        deadline,
        employeeId
      };

      const response = await createJob(newJob);
      alert('Job created successfully!');
      toogle(false);
      // Optionally refresh list or add to local state if structure matches
      // setArr(prev => [...prev, response.data.data]); 
      // But since we have complex grouping in Jobs.jsx, better to just close and let user refresh or trigger refresh.
      window.location.reload();

    } catch (error) {
      console.error("Error creating job:", error);
      alert('Failed to create job: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      height: '1110px',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)'
    }} >

      <div style={{ width: '436px', height: 'fit-content', backgroundColor: 'white', borderRadius: '10px', margin: 'auto', marginTop: '100px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <p style={{ width: '80%', margin: 'auto', fontWeight: 'bold' }}>Assign New Job</p>

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Job Name' value={jobName} onChange={(e) => setJobName(e.target.value)} />

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <input className='chosin' type="date" style={{ width: '80%', margin: 'auto' }} placeholder='Deadline' value={deadline} onChange={(e) => setDeadline(e.target.value)} />

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Employee ID' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

        <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button onClick={handleAddProduct} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', padding: '10px' }}>Assign</button>
          <button onClick={() => { toogle(false) }} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ' white', color: 'rgba(113, 82, 243, 1)', border: '1px solid grey', borderRadius: '10px', padding: '10px' }}>Cancel</button>
        </div>

      </div>
    </div>
  )
}