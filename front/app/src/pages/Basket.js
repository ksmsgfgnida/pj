import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchCategories, fetchProducts } from '../http/productApi';
import Pages from '../components/Pages';
import BasketList from '../components/BasketList';
import CreateOrder from '../components/createOrder';
import { fetchBasketItem, fetchTotalPrice } from '../http/basketApi';
import { useParams } from "react-router-dom";

const Basket = observer(() => {
    const { basketItem } = useContext(Context);
    const { id } = useParams();
    const [orderVisible, setOrderVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchBasketItem(id).then((data) => {
            basketItem.setBasketItems(data);
            const totalPrice = data.reduce((acc, item) => {
                return acc + item.QPrice;
            }, 0);
            setTotalPrice(totalPrice);
            basketItem.setTotalPrice(totalPrice)
        });
    }, [id, basketItem]);

    return (
        <Container className="mt-3">
            {basketItem.basketItems?.length > 0 ? (
                <>
                    <Col>
                        <BasketList />
                    </Col>
                    <h2>Basket Total: {totalPrice}</h2>
                    <Button variant='outline-dark' className='mt-4' onClick={() => setOrderVisible(true)}>Оформить заказ</Button>
                    <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)} /> 
                </>
            ) : (
                <Container>
                    Вы ещё ничего не выбрали
                </Container>
            )}
        </Container>
    )
})


export default Basket
