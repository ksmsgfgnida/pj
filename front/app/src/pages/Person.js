import React, {useContext, useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Button, Dropdown} from 'react-bootstrap'
import {Context} from "../index";
import { ListGroup } from 'react-bootstrap';
import { createOrder, fetchAddress, fetchOneOrder} from '../http/orderApi';

import { observer } from 'mobx-react-lite';
import { getUserData } from '../http/userApi';

const Person = () => {
    const {order} = useContext(Context)
    const {user} = useContext(Context)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        fetchOneOrder(userId).then(data =>
            order.setOrders(data));
    }, [])

    useEffect(() => {
        getUserData(userId).then((data) => {user.setDataUser(data)
            console.log(data,'apadn')
        })
    }, [])

    console.log(user)
    return (
    <div>
        <h1>Личный кабинет</h1>
        <h2>Ваши данные</h2>
        <ListGroup style={{marginBottom:'2%'}}>
                <ListGroup.Item >
                    <p style={{margin:'0'}}>email: {user.dataUser.email}</p>
                </ListGroup.Item>
                <ListGroup.Item >
                    <p style={{margin:'0'}}>Имя: {user.dataUser.name ? user.dataUser.name : 'Не указанo'}</p>
                </ListGroup.Item>
                <ListGroup.Item >
                    <p style={{margin:'0'}}>Фамилия: {user.dataUser.surname ? user.dataUser.surname : 'Не указана'}</p>
                </ListGroup.Item>
                <ListGroup.Item >
                    <p style={{margin:'0'}}>Номер телефона: {user.dataUser.phone ? user.dataUser.phone : 'Не указан'}</p>
                </ListGroup.Item>
        </ListGroup>
        <h2>Ваши заказы</h2>
        <ListGroup style={{marginBottom:'2%'}}>
            {order.orders.map((order, index) => (
                <ListGroup.Item key={index}>
                    <p style={{margin:'0'}}>Номер: {order.id}</p>
                    <p style={{margin:'0'}}>Дата: {order.orderDate}</p>
                    <p style={{margin:'0'}}>Метод Оплаты: {order.paymentMethod}</p>
                    <p style={{margin:'0'}}>Статус: {order.orderStatus}</p>
                    <p style={{margin:'0'}}>Товары:
                        {order.products.map((product, index) => (
                            <span key={index}>{product.name}, </span>
                        ))}
                    </p>
                    <p style={{margin:'0'}}>Адрес магазина: {order.addresshopId}</p>
                    <p style={{margin:'0'}}>Итого: {order.amount}</p>
                </ListGroup.Item>
            ))}
        </ListGroup>

        <hr />
    </div>
    )
}
export default Person