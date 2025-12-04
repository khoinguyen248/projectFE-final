import React, { useState, useEffect } from 'react';
import { CiSearch, CiBellOn } from "react-icons/ci";
import { getMyNotifications, sendNotification, markAsRead } from '../api';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [role, setRole] = useState('');
    const [newNotif, setNewNotif] = useState({
        receiverId: '',
        title: '',
        content: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('account'));
        if (user) {
            setRole(user.role);
            fetchNotifications();
        }
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await getMyNotifications();
            setNotifications(response.data.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            await sendNotification(newNotif);
            alert('Notification sent!');
            setNewNotif({ receiverId: '', title: '', content: '' });
            fetchNotifications();
        } catch (error) {
            console.error("Error sending notification:", error);
            alert('Failed to send notification');
        }
    };

    const handleRead = async (id) => {
        try {
            await markAsRead(id);
            fetchNotifications();
        } catch (error) {
            console.error("Error marking as read:", error);
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
                        }}>Notifications</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}>View and manage notifications</p>
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
                                }}>Send Notification</p>
                                <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Recipient ID (leave empty for all)"
                                        value={newNotif.receiverId}
                                        onChange={(e) => setNewNotif({ ...newNotif, receiverId: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        required
                                        value={newNotif.title}
                                        onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            paddingLeft: '15px',
                                            height: '40px',
                                            borderRadius: '5px'
                                        }}
                                    />
                                    <textarea
                                        placeholder="Message Content"
                                        required
                                        value={newNotif.content}
                                        onChange={(e) => setNewNotif({ ...newNotif, content: e.target.value })}
                                        style={{
                                            border: '1px solid rgba(162, 161, 168, 0.1)',
                                            padding: '15px',
                                            height: '80px',
                                            borderRadius: '5px',
                                            resize: 'vertical'
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
                                    }}>Send</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="boxcontent">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {notifications.length === 0 && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)' }}>No notifications</p>}
                            {notifications.map(notif => (
                                <div key={notif._id} style={{
                                    padding: '15px',
                                    border: '1px solid rgba(162, 161, 168, 0.1)',
                                    borderRadius: '10px',
                                    backgroundColor: notif.isRead ? 'white' : 'rgba(113, 82, 243, 0.05)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }} onClick={() => handleRead(notif._id)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', fontFamily: 'lexend' }}>{notif.title}</h4>
                                        <span style={{ fontSize: '12px', color: 'rgba(162, 161, 168, 1)' }}>
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '22px' }}>{notif.content}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(162, 161, 168, 1)' }}>
                                        From: {notif.createdBy ? `${notif.createdBy.fname} ${notif.createdBy.lname}` : 'System'}
                                    </p>
                                    {!notif.isRead && (
                                        <span style={{
                                            display: 'inline-block',
                                            marginTop: '8px',
                                            padding: '4px 12px',
                                            backgroundColor: 'rgba(113, 82, 243, 1)',
                                            color: 'white',
                                            borderRadius: '12px',
                                            fontSize: '10px'
                                        }}>NEW</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
