import {$authHost, $host} from "./index";


export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    return data
}

export const fetchAllOrder = async () => {
    const {data} = await $authHost.get('api/order')
    return data
}

export const fetchOneOrder = async (userId) => {
    const {data} = await $authHost.get('api/order/', userId)
    return data
}

export const fetchAddress = async () => {
    const {data} = await $authHost.get('api/address')
    return data
}
 