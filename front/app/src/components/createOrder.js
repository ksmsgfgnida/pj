import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Button, Dropdown} from 'react-bootstrap'
import {Context} from "../index";
import { ListGroup } from 'react-bootstrap';
import { createOrder, fetchAddress } from '../http/orderApi';
import { fetchBasketItem } from '../http/basketApi';
import { observer } from 'mobx-react-lite';

const CreateOrder = observer(({show, onHide}) => {
    const {order} = useContext(Context)
    const {basketItem} = useContext(Context)
 
    const [paymentMethod, setPaymentMethod] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [addressShopId, setAddressShopId] = useState('')
    // const [top, setTop] = useState('')
    // const [bottom, setBottom] = useState('')
    // const [file, setFile] = useState(null)
    // const [availability, setAvailability] = useState()
    // const [volume, setVolume] = useState(null)
    const userId = localStorage.getItem('user_id')
    
    useEffect( () => {
        fetchAddress().then((data) => {order.setAdress(data)
    console.log(data, '-----------------------ss')})
    }, [])

    useEffect(() => {
        fetchBasketItem(userId).then(data =>
            basketItem.setBasketItems(data));
        
  }, [])

    
    const addOrders = () => {
        const formData = new FormData()
        formData.append('paymentMethod', paymentMethod)
        formData.append('orderStatus', orderStatus)
        formData.append('basketId', userId)
        formData.append('userId', userId)
        formData.append('addresshopId', order.selectedAddress.id)
        
        createOrder(formData).then(data => onHide())
        alert("Вы оформили заказ!")
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Оформить заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <h4>Ваши товары</h4>
                <ListGroup style={{marginBottom:'2%'}}>
                    {basketItem.basketItems.map((basketitem, index) => (
                        <ListGroup.Item key={index} >
                            <p style={{margin:'0'}}>{basketitem.product.name}</p>
                            <p style={{margin:'0'}}>Всего: {basketitem.QPrice} рублей</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <hr />

                


           
                
                
                <Form>
                    <Dropdown className='mb-2 mt-2'>
                        <Dropdown.Toggle>{('Aдрес магазина: ' + order.selectedAddress && 'Aдрес магазина: ' + order.selectedAddress.city + ' ' + order.selectedAddress.street + ' ' + order.selectedAddress.house) || ("Выберите город")}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {order.address.map(addresse =>
                                <Dropdown.Item 
                                    onClick={() => order.setSelectedAddress(addresse)} 
                                    key={addresse.id}>
                                    {addresse.city}, ул.{addresse.street}, д.{addresse.house}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mb-2 mt-2'>
                        <Dropdown.Toggle>Метод оплаты: {paymentMethod}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item paymentMethod={'Банковская карта'} onClick={() => setPaymentMethod('Банковская карта')}>Банковская карта</Dropdown.Item>
                        <Dropdown.Item paymentMethod={'Наличные (рубли)'} onClick={() => setPaymentMethod('Наличные (рубли)')}>Наличные (рубли)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
                <h2>Итого: {basketItem.totalPrice}</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addOrders}>Оформить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateOrder;