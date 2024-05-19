import {$authHost,$host} from "./index";

export const createBasketItem = async (basketItem, quantity, QPrice) => {
    const {data} = await $authHost.post('api/basket', basketItem, quantity, QPrice)
    return data
}

export const fetchBasketItem = async (id) => {
    const { data } = await $host.get("api/basket/" + id);
    return data;
  };
  

export const deleteBasketItem = async (userId, basketItemId) => {
    const { data } = await $authHost.delete("api/basket/", {
        params: { userId: userId,
            productId: basketItemId
         },
      });
    return data;
};

export const fetchTotalPrice = async (userId) => {
    const {data} = await $host.get('api/basket', userId)
    return data
}
