import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { StoreContext } from './store';
import { deleteUser } from './api';

export const Modal2 = ({ setHooks, user, fetchOne }) => {


    const store = useContext(StoreContext)
    const { accountt } = store
    const handleDeleteProduct = async () => {

        try {
            await deleteUser(user._id)
        } catch (error) {
            console.error('delete error', error.response?.status, error.response?.data || error.message);

        }
    };
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)'
        }} onClick={() => { setHooks(false) }}>

            <div style={{ width: '436px', height: '415px', backgroundColor: 'white', borderRadius: '10px', margin: 'auto', marginTop: '100px', position: 'relative', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>


                <p style={{ marginTop: '100px', fontSize: '30px', fontWeight: '600', lineHeight: '40px', fontFamily: 'lexend' }}>Delete Users ?</p>

                <p style={{ fontFamily: 'lexend', fontSize: '16px', fontWeight: '300', lineHeight: '24px', color: 'rgba(162, 161, 168, 1)' }}>Please confirm your request</p>

                <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between', margin: 'auto' }}>
                    <button style={{
                        padding: '20px', width: '40%', margin: 'auto', border: 'none', borderRadius: '10px', backgroundColor: 'red', fontFamily: 'lexend', fontSize: '16px', fontWeight: '300', lineHeight: '24px', color: 'yellow', cursor: 'pointer', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onClick={() => handleDeleteProduct()}>Yes</button>

                    <button style={{
                        padding: '20px', width: '40%', margin: 'auto', border: 'none', borderRadius: '10px', backgroundColor: 'rgba(113, 82, 243, 1)', fontFamily: 'lexend', fontSize: '16px', fontWeight: '300', lineHeight: '24px', color: 'white', cursor: 'pointer', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onClick={() => setHooks(false)}>No</button>
                </div>

            </div>
        </div>
    )
}
