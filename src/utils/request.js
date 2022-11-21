import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let loading = null


// import JSONBig from 'json-bigint'

// create an axios instance
const service = axios.create({
    baseURL: "/admin",
    // transformResponse: [function(data) {
    //     try {
    //         return JSONBig.parse(data)
    //     } catch (err) {
    //         return data
    //     }
    // }],

    // -------------------------
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    // timeout: 50 // request timeout
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        //loading
        loading = Loading.service({
            lock: true,
            text: 'loading',
            spinner: "el-icon-loading",
            background: 'rgba(0,0,0,0.7)',
        })

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = getToken()
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
            // console.log(8989, res);
        const { error_code: resCode } = res
        // const { config: { headers } } = response
        // if the custom code is not 20000, it is judged as an error.
        if (res.error_code !== 200) {
            loading.close()
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.error_code == 10002) {
                // to re-login
                // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                //     confirmButtonText: 'Re-Login',
                //     cancelButtonText: 'Cancel',
                //     type: 'warning'
                // }).then(() => {
                //     store.dispatch('user/resetToken').then(() => {
                //         location.reload()
                //     })
                // })
                MessageBox.confirm('登录状态已过期，点击取消留在此页面，或重新登录 ', '重新登录确认', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            // if (headers.showLoading !== false) {
            //     Loading.hideLoading()
            // }
            loading.close()
            return res
        }
    },
    error => {
        loading.close()
        console.log(error) // for debug
        if (error.message == 'timeout of 5000ms exceeded') {
            Message({
                message: '网络连接超时，请检查网络！',
                type: 'error',
                duration: 5 * 1000
            })
        }
        // else if (error == 'Error: Request failed with status code 500') {
        //     Message({
        //         message: '网络连接超时，请检查网络！',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        // } 
        else {
            Message({
                message: error.msg,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)


export default service