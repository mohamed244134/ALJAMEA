import axios from 'axios'

import axiosRetry from 'axios-retry'

const instanceQuran = axios.create({
  baseURL: 'https://api.alquran.cloud',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
})

const instanceTafser = axios.create({
  baseURL: 'https://api.quran-tafseer.com',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
})

const instanceAudio = axios.create({
  baseURL: 'https://api.quran.com/api/v4',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
})

instanceQuran.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

instanceTafser.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

instanceAudio.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

axiosRetry(instanceQuran, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
})

axiosRetry(instanceTafser, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
})

axiosRetry(instanceAudio, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
})

export const apiQuran = () => {
  return instanceQuran
}
export const apiTafser = () => {
  return instanceTafser
}
export const apiAudio = () => {
  return instanceAudio
}
const apiService = { apiQuran, apiTafser, apiAudio }

export default apiService
