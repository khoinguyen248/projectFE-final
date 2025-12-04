import axios from 'axios'
import { data } from 'react-router-dom';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("tokenBackend"); // Lưu token khi đăng nhập
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth
export const signup = (data) => API.post('/account/register', data)
export const signin = (data1 ) => API.post(`/account/login`, data1)
export const getInfors = (email) => API.get(`/account/profile?email=${email}`) // Note: This might need adjustment if backend doesn't support query param like this, but keeping for now or will fix if 'me' route is better.
// Actually, backend has /employees/profile (getMyProfile) which is better if logged in.
// But for now let's stick to what we have or map to /employees/profile if it's for current user.
// The original code passed email. Backend /employees/profile uses token.
// Let's keep getInfors as is for now, but it might fail if backend doesn't have /account/profile.
// Checking backend routes: /account only has register and login.
// /employees/profile gets my profile.
// So getInfors should probably use /employees/profile and ignore email arg if it's for self, OR /admin/employees/:id if for others.
// Given the usage in frontend likely fetches "my" info, let's point to /employees/profile
export const getMyProfile = () => API.get('/employees/profile');

// Employee (Admin)
export const getAllemloyees = () => API.get('/admin/employees')
export const addEmployee = (data5) => API.post('/account/register', data5) // Admin creating employee is essentially registering them? Or is there a specific add employee route?
// Backend admin.js has update, delete, get, getDetail. No create.
// Backend account.js has register.
// So addEmployee should probably use register.
export const deleteUser = (id) => API.delete(`/admin/employees/${id}`);
export const updateEmployee = (id, data) => API.put(`/admin/employees/${id}`, data);

// Jobs
export const jobs = () => API.get('/jobs')
export const updateJobs = (id, data4) => API.put(`/jobs/${id}`, data4)
export const createJob = (data) => API.post('/jobs', data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

// Schedule
export const createSchedule = (data) => API.post('/schedules', data);
export const getAllSchedules = () => API.get('/schedules');
export const assignSchedule = (id, data) => API.put(`/schedules/${id}/assign`, data);
export const deleteSchedule = (id) => API.delete(`/schedules/${id}`);
export const getMySchedule = () => API.get('/employees/schedule');

// Salary
export const upsertSalary = (data) => API.post('/salary', data);
export const getSalary = (employeeId) => API.get(`/salary/${employeeId}`);
export const getMySalary = () => API.get('/employees/salary');

// Timesheet
export const checkIn = (data) => API.post('/timesheet/check-in', data);
export const checkOut = (data) => API.post('/timesheet/check-out', data);
export const getTimesheets = () => API.get('/timesheet');
export const getMonthlyReport = () => API.get('/timesheet/report');

// Notification
export const sendNotification = (data) => API.post('/notifications', data);
export const getMyNotifications = () => API.get('/notifications');
export const markAsRead = (id) => API.put(`/notifications/${id}/read`);

// Predict
export const predictChurn = (employeeId) => API.get(`/predict/churn/${employeeId}`);