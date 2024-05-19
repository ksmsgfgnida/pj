import Admin from './pages/Admin'
import Basket from './pages/Basket'
import Person from './pages/Person'

import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProductPage from './pages/ProductPage'

import { Navigate } from "react-router-dom";

import { ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, CONTACT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PERSON_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE } from './utils/consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE + '/:id',
        Component: Basket
    },
    {
        path: PERSON_ROUTE,
        Component: Person
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Login
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: CONTACT_ROUTE,
        Component: Contact
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]