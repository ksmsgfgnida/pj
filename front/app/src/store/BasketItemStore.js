import { makeAutoObservable } from "mobx";

export default class BasketItemStore {
  constructor() {
    this._basketItems = [];
    this._totalPrice = 0
    makeAutoObservable(this);
    
  }
  
  setBasketItems(basketItems) {
    this._basketItems = basketItems
  }

  setTotalPrice(totalPrice) {
    this._totalPrice = totalPrice
    
  }

  get basketItems() { // Получить все товары в корзине
    return this._basketItems;
  }

  get totalPrice() {
    return this._totalPrice;
}

}

 