// Backend API base URL (backend runs on port 3000 by default)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const USER_API_END_POINT = `${API_BASE}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/api/v1/company`;