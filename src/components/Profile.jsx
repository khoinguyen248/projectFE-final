import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getMyProfile } from '../api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getMyProfile();
            console.log('Profile response:', response.data);
            const profileData = response.data.data || response.data;
            console.log('Profile data:', profileData);
            setProfile(profileData);
        } catch (error) {
            console.error("Error fetching profile:", error);
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
                        }}>My Profile</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>View your personal information</p>
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
                    {loading && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginTop: '20px' }}>Loading...</p>}
                    {!loading && profile && (
                        <div style={{
                            marginTop: '20px',
                            padding: '30px',
                            border: '1px solid rgba(162, 161, 168, 0.1)',
                            borderRadius: '10px',
                            backgroundColor: 'white'
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '800px' }}>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>First Name</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{profile.fname}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Last Name</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{profile.lname}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Email</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{profile.email}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Role</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: 'rgba(113, 82, 243, 0.1)',
                                            color: 'rgba(113, 82, 243, 1)',
                                            borderRadius: '5px'
                                        }}>{profile.role}</span>
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Department</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{profile.department || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Phone</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{profile.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)', marginBottom: '5px' }}>Status</p>
                                    <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: profile.status === 'Active' ? 'rgba(63, 194, 138, 0.1)' : 'rgba(244, 91, 105, 0.1)',
                                            color: profile.status === 'Active' ? 'rgba(63, 194, 138, 1)' : 'rgba(244, 91,105, 1)',
                                            borderRadius: '5px'
                                        }}>{profile.status || 'Active'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
