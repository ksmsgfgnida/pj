import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('user_id', jwtDecode(data.token).id);
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    // localStorage.setItem('user_id', jwtDecode(data.token).id);
    console.log(jwtDecode(data.token).id)
    return jwtDecode(data.token)
}

export const getUserData = async (userId) => {
    const {data} = await $authHost.get('api/user', {
        params: { userId: userId
         },
      })
    return data
}