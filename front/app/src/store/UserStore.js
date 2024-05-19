import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._dataUser = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setDataUser(dataUser) {
        this._dataUser = dataUser
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get dataUser() {
        return this._dataUser
    }
} 