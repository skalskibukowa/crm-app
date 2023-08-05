const API_URL = 'http://localhost:8081'

const APP_URL = 'http://localhost:5173'


export const API_ROUTES = {
    SIGN_IN: `${API_URL}/api/v1/login`,
    GET_USER: (userId) => `${API_URL}/api/v1/user/${userId}`, // Dynamic URL with userId
    REGISTER: `${API_URL}/api/v1/signup`
}

export const APP_ROUTES = {
    SIGN_IN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboardTest',
    GET_USER: (userId) => `/userDetails/${userId}` // '/userDetails/:userId'  // `${API_URL}/userDetails/:userId`
}