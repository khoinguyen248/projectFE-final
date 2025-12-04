import React, { useState } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { predictChurn } from '../api';

const Predict = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);
        try {
            const response = await predictChurn(employeeId);
            setPrediction(response.data);
        } catch (error) {
            console.error("Error predicting churn:", error);
            alert('Prediction failed');
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
                        }}>Employee Churn Prediction</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>Predict employee turnover risk</p>
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
                    <div className="searchbar" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{
                            padding: '30px',
                            border: '1px solid rgba(162, 161, 168, 0.1)',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            maxWidth: '600px'
                        }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '15px',
                                fontFamily: 'lexend'
                            }}>AI-Powered Prediction</p>
                            <form onSubmit={handlePredict} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Employee ID"
                                    required
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    style={{
                                        flex: 1,
                                        border: '1px solid rgba(162, 161, 168, 0.1)',
                                        paddingLeft: '15px',
                                        height: '45px',
                                        borderRadius: '10px',
                                        fontSize: '14px'
                                    }}
                                />
                                <button type="submit" disabled={loading} style={{
                                    backgroundColor: loading ? 'rgba(162, 161, 168, 0.5)' : 'rgba(113, 82, 243, 1)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0 35px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '300'
                                }}>
                                    {loading ? 'Analyzing...' : 'Predict'}
                                </button>
                            </form>

                            {prediction && (
                                <div style={{
                                    marginTop: '30px',
                                    padding: '25px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(162, 161, 168, 0.1)'
                                }}>
                                    <h3 style={{
                                        marginTop: 0,
                                        marginBottom: '20px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontFamily: 'lexend'
                                    }}>Prediction Result</h3>

                                    <div style={{ marginBottom: '15px' }}>
                                        <p style={{
                                            fontSize: '14px',
                                            color: 'rgba(162, 161, 168, 1)',
                                            marginBottom: '5px'
                                        }}>Churn Probability</p>
                                        <p style={{
                                            fontSize: '32px',
                                            fontWeight: '600',
                                            margin: 0,
                                            color: 'rgba(113, 82, 243, 1)'
                                        }}>{(prediction.churnProbability * 100).toFixed(2)}%</p>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <p style={{
                                            fontSize: '14px',
                                            color: 'rgba(162, 161, 168, 1)',
                                            marginBottom: '5px'
                                        }}>Risk Level</p>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '8px 20px',
                                            backgroundColor:
                                                prediction.riskLevel === 'High' ? 'rgba(244, 91, 105, 0.1)' :
                                                    prediction.riskLevel === 'Medium' ? 'rgba(239, 190, 18, 0.1)' :
                                                        'rgba(63, 194, 138, 0.1)',
                                            color:
                                                prediction.riskLevel === 'High' ? 'rgba(244, 91, 105, 1)' :
                                                    prediction.riskLevel === 'Medium' ? 'rgba(239, 190, 18, 1)' :
                                                        'rgba(63, 194, 138, 1)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}>{prediction.riskLevel}</span>
                                    </div>

                                    <div>
                                        <p style={{
                                            fontSize: '14px',
                                            color: 'rgba(162, 161, 168, 1)',
                                            marginBottom: '8px'
                                        }}>Analysis</p>
                                        <p style={{
                                            fontSize: '14px',
                                            lineHeight: '22px',
                                            margin: 0
                                        }}>{prediction.reasoning}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Predict;
