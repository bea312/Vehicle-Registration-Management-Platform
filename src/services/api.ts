import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://student-management-system-backend.up.railway.app'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
