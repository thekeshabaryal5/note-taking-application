export const serverUrl = import.meta.env.VITE_SERVER_URL;
export const registerApi = `${serverUrl}/api/user/register`;
export const verifyEmailApi = `${serverUrl}/api/user/verify-email`;
export const loginApi = `${serverUrl}/api/user/login`;
export const profileApi = `${serverUrl}/api/user/me`;
export const logoutApi = `${serverUrl}/api/user/logout`;
