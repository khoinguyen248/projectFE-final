import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("tokenBackend");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth
export const signup = (data) => API.post('/account/register', data)
export const signin = (data1) => API.post(`/account/login`, data1)
export const getMyProfile = () => API.get('/employees/profile');

// Employee (Admin)
export const getAllemloyees = () => API.get('/admin/employees')
export const addEmployee = (data5) => API.post('/account/register', data5)
export const deleteUser = (id) => API.delete(`/admin/employees/${id}`);
export const updateEmployee = (id, data) => API.put(`/admin/employees/${id}`, data);

// Jobs
export const jobs = () => API.get('/jobs')
export const updateJobs = (id, data4) => API.put(`/jobs/${id}`, data4)
export const createJob = (data) => API.post('/jobs', data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getMyJobs = () => API.get('/employees/jobs');

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
export const getMonthlyReport = (employeeId, month, year) => API.get(`/timesheet/report?employeeId=${employeeId}&month=${month}&year=${year}`);

// Notification
export const sendNotification = (data) => API.post('/notifications', data);
export const getMyNotifications = () => API.get('/notifications');
export const markAsRead = (id) => API.put(`/notifications/${id}/read`);

// Predict
export const predictChurn = (employeeId) => API.get(`/predict/churn/${employeeId}`);