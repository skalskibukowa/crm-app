const API_URL = 'http://localhost:8081'


export const API_ROUTES = {
    SIGN_IN: `${API_URL}/api/v1/login`,
    GET_USER: (userId) => `${API_URL}/api/v1/user/${userId}` // Dynamic URL with userId
}

export const APP_ROUTES = {
    SIGN_IN: '/loginTest',
    DASHBOARD: '/dashboardTest'
}