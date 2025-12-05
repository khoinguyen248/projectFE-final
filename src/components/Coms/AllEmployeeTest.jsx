import React, { useState, useEffect, useContext } from 'react'
import { CiSearch, CiBellOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdWork, MdAttachMoney, MdLogin, MdLogout } from "react-icons/md";
import { StoreContext } from '../../store';
import { getAllemloyees, getMonthlyReport, getSalary, deleteUser, predictChurn, checkIn, checkOut, createJob, upsertSalary } from '../../api';
import './Allemployee.css'

const AllEmployee = () => {
  const store = useContext(StoreContext);
  const { accountt } = store;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({}); // Store hours, predictions per employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showSalarySetModal, setShowSalarySetModal] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Form states
  const [salaryForm, setSalaryForm] = useState({ baseSalary: '', bonus: '', deduction: '' });
  const [jobForm, setJobForm] = useState({ jobName: '', description: '', deadline: '' });

  const isAdmin = accountt?.role === 'Admin' || accountt?.role === 'Manager';

  useEffect(() => {
    if (isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllemloyees();
      const empList = response.data.data;
      setEmployees(empList);

      // Fetch additional data for each employee
      const dataPromises = empList.map(async (emp) => {
        const data = {};

        // Fetch hours worked
        try {
          const hoursRes = await getMonthlyReport(emp._id, currentMonth, currentYear);
          data.totalHours = hoursRes.data.totalHours || 0;
        } catch (err) {
          data.totalHours = 0;
        }

        // Fetch prediction (admin only)
        if (isAdmin) {
          try {
            const predRes = await predictChurn(emp._id);
            data.churnRisk = predRes.data.riskLevel;
          } catch (err) {
            data.churnRisk = 'Unknown';
          }
        }

        return { id: emp._id, ...data };
      });

      const allData = await Promise.all(dataPromises);
      const dataMap = {};
      allData.forEach(item => {
        dataMap[item.id] = item;
      });
      setEmployeeData(dataMap);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const handleViewSalary = async (emp) => {
    try {
      const response = await getSalary(emp._id);
      setSelectedEmployee({ ...emp, salaryData: response.data.data, totalNetPay: response.data.totalNetPay });
      setShowSalaryModal(true);
    } catch (error) {
      alert('Failed to fetch salary: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCheckIn = async (empId) => {
    try {
      await checkIn({ location: 'Office', employeeId: empId });
      alert('Checked in for employee!');
    } catch (error) {
      alert('Check-in failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCheckOut = async (empId) => {
    try {
      await checkOut({ employeeId: empId });
      alert('Checked out for employee!');
    } catch (error) {
      alert('Check-out failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAssignJob = async () => {
    try {
      await createJob({ ...jobForm, employeeId: selectedEmployee._id });
      alert('Job assigned successfully!');
      setShowJobModal(false);
      setJobForm({ jobName: '', description: '', deadline: '' });
    } catch (error) {
      alert('Failed to assign job: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSetSalary = async () => {
    try {
      await upsertSalary({ ...salaryForm, employeeId: selectedEmployee._id });
      alert('Salary updated successfully!');
      setShowSalarySetModal(false);
      setSalaryForm({ baseSalary: '', bonus: '', deduction: '' });
    } catch (error) {
      alert('Failed to update salary: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (empId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteUser(empId);
        alert('Employee deleted!');
        fetchEmployees();
      } catch (error) {
        alert('Delete failed: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <>
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
              }}>All Employees</p>
              <p style={{
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '22px',
                textAlign: 'left',
                color: 'rgba(162, 161, 168, 1)'
              }}>All employees information</p>
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
                height: '50px',
              }} className='input-search' />
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
                <input type="text" placeholder="Search employees..." style={{
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

              {isAdmin && (
                <button style={{
                  width: '180px',
                  height: '50px',
                  paddingLeft: '20px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(113, 82, 243, 1)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <IoIosAddCircleOutline /> Add Employee
                </button>
              )}
            </div>

            <div className="boxcontent" style={{ overflowX: 'auto' }}>
              <div className='boxcontent-1' style={{
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '24px',
                color: 'rgba(162, 161, 168, 1)',
                display: 'grid',
                gridTemplateColumns: isAdmin
                  ? '120px 150px 100px 100px 90px 90px 90px 240px'
                  : '150px 180px 120px 100px 90px 100px',
                gap: '10px',
                minWidth: 'max-content'
              }}>
                <p>Name</p>
                <p>Email</p>
                <p>Role</p>
                <p>Department</p>
                <p>Status</p>
                <p>Hours (Month)</p>
                <p>Salary</p>
                {isAdmin && <p>Actions</p>}
              </div>
              <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

              {loading && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>Loading...</p>}
              {!loading && employees.map(emp => (
                <div key={emp._id}>
                  <div className='boxcontent-1' style={{
                    alignItems: 'center',
                    display: 'grid',
                    gridTemplateColumns: isAdmin
                      ? '120px 150px 100px 100px 90px 90px 90px 240px'
                      : '150px 180px 120px 100px 90px 100px',
                    gap: '10px'
                  }}>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>{emp.fname} {emp.lname}</p>
                    <p style={{ fontSize: '13px', wordBreak: 'break-word', maxWidth: '150px' }}>{emp.email}</p>
                    <p>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: 'rgba(113, 82, 243, 0.1)',
                        color: 'rgba(113, 82, 243, 1)',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>{emp.role}</span>
                    </p>
                    <p style={{ fontSize: '13px' }}>{emp.department || 'N/A'}</p>
                    <p>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: emp.status === 'Active' ? 'rgba(63, 194, 138, 0.1)' : 'rgba(244, 91, 105, 0.1)',
                        color: emp.status === 'Active' ? 'rgba(63, 194, 138, 1)' : 'rgba(244, 91, 105, 1)',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>{emp.status || 'Active'}</span>
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>{employeeData[emp._id]?.totalHours || 0}h</p>
                    <p>
                      <button onClick={() => handleViewSalary(emp)} style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(239, 190, 18, 0.1)',
                        color: 'rgba(239, 190, 18, 1)',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>View</button>
                    </p>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => { setSelectedEmployee(emp); setShowJobModal(true); }} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(113, 82, 243, 1)',
                          padding: '4px'
                        }} title="Assign Job"><MdWork size={18} /></button>
                        <button onClick={() => { setSelectedEmployee(emp); setShowSalarySetModal(true); }} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(63, 194, 138, 1)',
                          padding: '4px'
                        }} title="Set Salary"><MdAttachMoney size={18} /></button>
                        <button onClick={() => handleCheckIn(emp._id)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(239, 190, 18, 1)',
                          padding: '4px'
                        }} title="Check In"><MdLogin size={18} /></button>
                        <button onClick={() => handleCheckOut(emp._id)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(244, 91, 105, 1)',
                          padding: '4px'
                        }} title="Check Out"><MdLogout size={18} /></button>
                        <button onClick={() => handleDelete(emp._id)} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'red',
                          padding: '4px'
                        }} title="Delete"><FaRegTrashAlt size={16} /></button>
                        {employeeData[emp._id]?.churnRisk && (
                          <span style={{
                            padding: '4px 8px',
                            backgroundColor: employeeData[emp._id].churnRisk === 'High' ? 'rgba(244, 91, 105, 0.1)' : 'rgba(63, 194, 138, 0.1)',
                            color: employeeData[emp._id].churnRisk === 'High' ? 'rgba(244, 91, 105, 1)' : 'rgba(63, 194, 138, 1)',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}>{employeeData[emp._id].churnRisk}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Salary View Modal */}
      {showSalaryModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowSalaryModal(false)}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            minWidth: '400px'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Salary Details - {selectedEmployee.fname} {selectedEmployee.lname}</h3>
            {selectedEmployee.salaryData ? (
              <div>
                <p><strong>Base Salary:</strong> ${selectedEmployee.salaryData.baseSalary}</p>
                <p><strong>Bonus:</strong> ${selectedEmployee.salaryData.bonus}</p>
                <p><strong>Deduction:</strong> ${selectedEmployee.salaryData.deduction}</p>
                <p style={{ fontSize: '20px', fontWeight: '600', color: 'rgba(113, 82, 243, 1)' }}>
                  <strong>Net Pay:</strong> ${selectedEmployee.totalNetPay}
                </p>
              </div>
            ) : (
              <p>No salary information available</p>
            )}
            <button onClick={() => setShowSalaryModal(false)} style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'rgba(113, 82, 243, 1)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Close</button>
          </div>
        </div>
      )}

      {/* Assign Job Modal */}
      {showJobModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowJobModal(false)}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            minWidth: '400px'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Assign Job to {selectedEmployee.fname} {selectedEmployee.lname}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="Job Name"
                value={jobForm.jobName}
                onChange={(e) => setJobForm({ ...jobForm, jobName: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px'
                }}
              />
              <textarea
                placeholder="Description"
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px',
                  minHeight: '80px'
                }}
              />
              <input
                type="date"
                value={jobForm.deadline}
                onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleAssignJob} style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: 'rgba(113, 82, 243, 1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>Assign</button>
                <button onClick={() => setShowJobModal(false)} style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: 'rgba(162, 161, 168, 0.2)',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Salary Modal */}
      {showSalarySetModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowSalarySetModal(false)}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            minWidth: '400px'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Set Salary for {selectedEmployee.fname} {selectedEmployee.lname}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="number"
                placeholder="Base Salary"
                value={salaryForm.baseSalary}
                onChange={(e) => setSalaryForm({ ...salaryForm, baseSalary: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px'
                }}
              />
              <input
                type="number"
                placeholder="Bonus"
                value={salaryForm.bonus}
                onChange={(e) => setSalaryForm({ ...salaryForm, bonus: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px'
                }}
              />
              <input
                type="number"
                placeholder="Deduction"
                value={salaryForm.deduction}
                onChange={(e) => setSalaryForm({ ...salaryForm, deduction: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid rgba(162, 161, 168, 0.3)',
                  borderRadius: '5px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleSetSalary} style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: 'rgba(63, 194, 138, 1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>Set Salary</button>
                <button onClick={() => setShowSalarySetModal(false)} style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: 'rgba(162, 161, 168, 0.2)',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllEmployee