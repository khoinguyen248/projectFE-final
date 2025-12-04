import React, { useEffect, useState } from 'react'
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getTimesheets, checkIn, checkOut } from '../../api';

const Attendance = () => {

  const [check, setCheck] = useState(false)
  const [arr, setArr] = useState([])
  const [role, setRole] = useState('')

  const fetchOne = async () => {
    try {
      setCheck(true)
      const respone = await getTimesheets()
      const data = respone.data.data
      setArr(data)
      setCheck(false)
    }
    catch {
      console.log('error')
      setCheck(false)
    }

  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('account'));
    if (user) setRole(user.role);
    fetchOne()
  }, [])

  const handleCheckIn = async () => {
    try {
      await checkIn({ location: 'Office' });
      alert('Checked In!');
      fetchOne();
    } catch (error) {
      alert('Check-in failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut();
      alert('Checked Out!');
      fetchOne();
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
              textAlign: 'left'

            }}>Attendance</p>
            <p style={{

              fontSize: '14px',
              fontWeight: '300',
              lineHeight: '22px',
              textAlign: 'left',
              color: 'rgba(162, 161, 168, 1)'

            }}  >All employees Attendance</p>
          </div>

          <div className='header-2' style={{
            position: 'relative',
            height: '50px',

            display: 'flex',
            gap: '12px'
          }}>
            <button onClick={handleCheckIn} style={{
              borderRadius: '10px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              padding: '0 20px',
              cursor: 'pointer'
            }}>Check In</button>
            <button onClick={handleCheckOut} style={{
              borderRadius: '10px',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              padding: '0 20px',
              cursor: 'pointer'
            }}>Check Out</button>
          </div>
        </div>

        <div className='inforbox'>
          <div className="searchbar" style={{

            marginTop: '20px'
          }}>
            <div className="searchbar1" style={{
              position: 'relative', height: '50px'
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
            </div>
          </div>

          <div className="boxcontent">
            <div className='boxcontent-1 ' style={{

              fontSize: '16px',
              fontWeight: '300',
              lineHeight: '24px',
              color: 'rgba(162, 161, 168, 1)'

            }} >
              <p style={{
                width: '328px',
                textAlign: 'left'
              }}>Employee Name</p>

              <p style={{
                width: '258px',
                textAlign: 'left'
              }}>Department</p>
              <p style={{
                width: '162px',
                textAlign: 'left'
              }}>Date</p>
              <p style={{
                width: '192px',
                textAlign: 'left'
              }}>
                Check-in time
              </p>
              <p style={{
                width: '110px',
                textAlign: 'left'
              }}>Status</p>

            </div>
            <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

            {check && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)' }}>please wait</p>}
            {!check && arr.length > 0 && arr?.map(item => {
              return (<> <div key={item._id} style={{ display: "flex" }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  width: '328px',
                  height: '30px'

                }}>
                  <p >{item.employeeId ? `${item.employeeId.fname} ${item.employeeId.lname}` : 'Unknown'}</p>

                </div>

                <p style={{
                  width: '258px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}>{item.employeeId ? item.employeeId.department : '-'}</p>

                <p style={{
                  width: '162px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}> {new Date(item.createdAt).toLocaleDateString()}</p>

                <p style={{
                  width: '192px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}> {new Date(item.checkIn).toLocaleTimeString()}</p>
                <p style={{
                  color: item.status === "OnTime" ? 'rgba(63, 194, 138, 1)' : 'rgba(244, 91, 105, 1)',
                  backgroundColor: item.status === "OnTime" ? 'rgba(63, 194, 138, 0.1)' : 'rgba(244, 91, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  fontSize: '12px',
                  borderRadius: '4px'

                }}>
                  {item.status || 'Present'}
                </p>
              </div>
                <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />


              </>)
            })}

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '50px', alignItems: 'center' }}
            >
              <p style={{ color: 'rgba(162, 161, 168, 1)' }}>Showing records</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Attendance