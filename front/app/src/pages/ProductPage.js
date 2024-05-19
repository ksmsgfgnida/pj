import React, { useEffect, useState, useContext } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/productApi'


import { Button } from 'react-bootstrap';
import { createBasketItem } from '../http/basketApi';
import { Context } from '../index';



const secret_key = 'bcrypt-secret-key';

const ProductPage = () => {
    const [product, setProduct] = useState()
    const {id} = useParams()
    const {user} = useContext(Context)
    const {basketItem} = useContext(Context)

    const addBasketItem = () => {
        if (!user.isAuth) {
            return alert('Пожалуйста, авторизуйтесь, чтобы добавить товар в корзину');
        } 
    
        const userId = localStorage.getItem('user_id');
        
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', id);
        formData.append('quantity', 1);
        formData.append('QPrice', product.price);
        console.log(userId)
        createBasketItem(formData).then(() => {
             alert('Товар в корзине!');
             console.log(formData, product.price, "price")
            //  basketItem.add(id) //добавила id товара в стор
         })
    }
    

    useEffect( () => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <>
        <Container style={{marginTop: '10%', marginBottom: '10%'}}>
            {product && (
                <Row className='justify-content-center align-items-center'>
                    <Col sm={4} className='border-secondary'>
                        <Image width={'80%'} height={'80%'} src={process.env.REACT_APP_API_URL + product.img} />
                    </Col>
                    <Col sm={8}> 
                        <Col>
                            <h2>{product.name}</h2>
                            <div className='mt-4'>
                                <h6>Объем: {product.volume}</h6>
                                <h6>Цена: {product.price}</h6>
                                
                            </div>
                        </Col>
    
                        <Col className='mt-4'>
                            <h6>Описание</h6>
                            <p>{product.description}</p>
                            
                            <h6>Характеристики</h6>
                            <p style={{margin: '0', }}>Верхние ноты: {product.top_notes}</p>
                            <p style={{margin: '0', }}>Нижние ноты: {product.bottom_notes}</p>
                        </Col>
                    </Col>
                </Row>
            )}
            
        </Container>
        <Button onClick={addBasketItem}>Добавить в корзину</Button>
        </>
    )
    
    }
export default ProductPage