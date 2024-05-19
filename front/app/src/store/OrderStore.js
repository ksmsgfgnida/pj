import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._orders = []
        this._userOrdes = []
        this._address = []
        this._selectedAddress = {}
        makeAutoObservable(this)
    }


    setOrders(orders) {
        this._orders = orders
    }
    
    setSelectedAddress(address) {
        this._selectedAddress = address
    }

    setAdress(address) {
        this._address = address
    }

    get orders() {
        return this._orders;
    }
    
    get selectedAddress() {
        return this._selectedAddress
    }

    get address() {
        return this._address;
    }
}