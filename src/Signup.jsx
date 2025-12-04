import React from "react";
import { useState } from "react";
import { signup } from "./api";
import './Signin.css';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import logo from './logo.png';
import dashboard from './dashboard.png';
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [role, setRole] = useState('EMPLOYEE')
    const [adminKey, setAdminKey] = useState('')
    const [pass, setPass] = useState(true)
    const [errstr, setErrstr] = useState('')
    const [missInf, setMissInf] = useState(true)
    const navigate = useNavigate()
    const checkPass = () => {
        setPass(!pass)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newaccount = {
            email,
            password,
            fname,
            lname,
            role,
            adminKey: role === 'MANAGER' ? adminKey : undefined
        };

        try {
            const response = await signup(newaccount);
            console.log(response.data);
            alert('Account created !')
            navigate("/signin")
            setMissInf(true)

        } catch (err) {
            console.error("Signup failed:", err.response?.data || err.message);
            setMissInf(false)
            setErrstr(err.response?.data.message)
        }
    };


    return (
        <>
            <div className="container">
                <div style={{
                    backgroundColor: 'rgba(113, 82, 243, 0.05)',
                    height: '100%',
                    width: '58%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <img src={dashboard} alt="" style={{ height: "80%", width: "80%" }} />
                </div>

                {missInf ? <><div className="checkBox" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    width: '42%',
                    justifyContent: 'center'
                }}>

                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        marginBottom: '40px',
                        width: '100%',
                        gap: '10px'
                    }}>
                        <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
                        <h1 style={{ fontFamily: 'lexend', fontSize: '30px' }}>HRMS</h1>
                    </div>

                    <p style={{
                        marginBottom: '8px',
                        fontFamily: 'Lexend',
                        fontSize: '30px',
                        fontWeight: '600',
                        lineHeight: '40px'
                    }}>Welcome</p>
                    <p style={{
                        marginBottom: '30px',
                        fontFamily: 'lexend',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        color: 'rgba(162, 161, 168, 1)'
                    }}>Please login here</p>

                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input id="email" name="email" type='email' placeholder=" " required className='sign' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email" className='title'>Email Address</label>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', width: '500px' }}>
                        <div className="input-container" style={{ marginBottom: '0', width: '50%' }}>
                            <input id="fname" name="fname" type='text' placeholder=" " required className='sign' style={{ width: '100%' }} value={fname} onChange={(e) => setFname(e.target.value)} />
                            <label htmlFor="fname" className='title'>First Name</label>
                        </div>
                        <div className="input-container" style={{ marginBottom: '0', width: '50%' }}>
                            <input id="lname" name="lname" type='text' placeholder=" " required className='sign' style={{ width: '100%' }} value={lname} onChange={(e) => setLname(e.target.value)} />
                            <label htmlFor="lname" className='title'>Last Name</label>
                        </div>
                    </div>

                    <div className="input-container" style={{ position: 'relative' }}>
                        <input
                            type={pass ? "password" : "text"}
                            id="password"
                            name="password"
                            placeholder=" "
                            required
                            className='sign'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className='title'>Password</label>
                        {pass ? <FaEye onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '24px', left: '470px' }} /> : <FaRegEyeSlash onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '35%', left: '470px' }} />}
                    </div>

                    <select defaultValue={"EMPLOYEE"} value={role} onChange={(e) => setRole(e.target.value)} style={{ marginTop: '20px', width: '500px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="MANAGER">MANAGER (Admin)</option>
                    </select>

                    {role === 'MANAGER' && (
                        <div className="input-container" style={{ marginTop: '20px' }}>
                            <input id="adminKey" name="adminKey" type='password' placeholder=" " className='sign' value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
                            <label htmlFor="adminKey" className='title'>Admin Key</label>
                        </div>
                    )}

                    <button style={{
                        width: '500px',
                        padding: '20px',
                        marginTop: '30px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(113, 82, 243, 1)',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }} onClick={handleSubmit}  >Create account</button>

                </div></> : <><div className="checkBox" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    width: '42%',
                    justifyContent: 'center'
                }}>

                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        marginBottom: '40px',
                        width: '100%',
                        gap: '10px'
                    }}>
                        <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
                        <h1 style={{ fontFamily: 'lexend', fontSize: '30px' }}>HRMS</h1>
                    </div>

                    <p style={{
                        marginBottom: '8px',
                        fontFamily: 'Lexend',
                        fontSize: '30px',
                        fontWeight: '600',
                        lineHeight: '40px'
                    }}>Welcome</p>
                    <p style={{
                        marginBottom: '30px',
                        fontFamily: 'lexend',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        color: 'rgba(162, 161, 168, 1)'
                    }}>Please login here</p>

                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input id="email" name="email" type='email' placeholder=" " required className='sign2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email" className='title2'>Email Address</label>
                        <p style={{
                            fontFamily: 'lexend',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: '300px',
                            color: 'red'
                        }}>{errstr}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', width: '500px' }}>
                        <div className="input-container" style={{ marginBottom: '0', width: '50%' }}>
                            <input id="fname" name="fname" type='text' placeholder=" " required className='sign2' style={{ width: '100%' }} value={fname} onChange={(e) => setFname(e.target.value)} />
                            <label htmlFor="fname" className='title2'>First Name</label>
                        </div>
                        <div className="input-container" style={{ marginBottom: '0', width: '50%' }}>
                            <input id="lname" name="lname" type='text' placeholder=" " required className='sign2' style={{ width: '100%' }} value={lname} onChange={(e) => setLname(e.target.value)} />
                            <label htmlFor="lname" className='title2'>Last Name</label>
                        </div>
                    </div>

                    <div className="input-container" style={{ position: 'relative' }}>
                        <input
                            type={pass ? "password" : "text"}
                            id="password"
                            name="password"
                            placeholder=" "
                            required
                            className='sign2'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className='title2'>Password</label>
                        {pass ? <FaEye onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '24px', left: '470px' }} /> : <FaRegEyeSlash onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '35%', left: '470px' }} />}
                        <p style={{
                            fontFamily: 'lexend',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: '300px',
                            color: 'red'
                        }}>{errstr}</p>
                    </div>

                    <select defaultValue={"EMPLOYEE"} value={role} onChange={(e) => setRole(e.target.value)} style={{ marginTop: '20px', width: '500px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="MANAGER">MANAGER (Admin)</option>
                    </select>

                    {role === 'MANAGER' && (
                        <div className="input-container" style={{ marginTop: '20px' }}>
                            <input id="adminKey" name="adminKey" type='password' placeholder=" " className='sign2' value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
                            <label htmlFor="adminKey" className='title2'>Admin Key</label>
                        </div>
                    )}

                    <button style={{
                        width: '500px',
                        padding: '20px',
                        marginTop: '30px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(113, 82, 243, 1)',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }} onClick={handleSubmit}  >Create account</button>

                </div></>}

            </div>
        </>
    )
}

export default Signup