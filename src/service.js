import axios from "axios";
import{getToken} from './utils/setToken'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL:'/api', //baseUrl会自动加在请求地址上
    timeout:5000 //如果请求时间超过5秒 则中断请求
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么(获取并设值token)
    config.headers['token'] = getToken('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let { status, message } = response.data
    if(status!==200){
        Message({message:message || 'error', type:'warning'})
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service