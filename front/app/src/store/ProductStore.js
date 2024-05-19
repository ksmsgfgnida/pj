import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._categories = []
        this._products = []
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3 //лимит на одной странице
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setProducts(products) {
        this._products = products
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    
    get categories() {
        return this._categories
    }

    get products() {
        return this._products;
    }
    
    get selectedCategory() {
        return this._selectedCategory
    }
    
    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}