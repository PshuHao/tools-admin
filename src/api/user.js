import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data
    })
}

export function modifypwd(data) {
    return request({
        url: '/modifypwd',
        method: 'post',
        data
    })
}
export function getSysInfo() {
    return request({
        url: '/sys/info',
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        },
    })
}
// export function raidAdd(data) {
//     return request({
//         url: '/raid/add',
//         method: 'post',
//         data
//     })
// }
export function getInfo(token) {
    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}