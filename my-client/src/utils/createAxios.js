import axios from 'axios';

const createAxios = axios.create({
  baseURL: '/api/v1',
});

createAxios.interceptors.response.use(
    (response)=>response,
    (error)=>{
        return Promise.reject(error)
    }
)
export default createAxios;