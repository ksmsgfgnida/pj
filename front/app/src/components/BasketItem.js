import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { BASKET_ROUTE } from '../utils/consts';
import { fetchBasketItem, fetchTotalPrice } from '../http/basketApi';
import { Stack, Card, Button, Row, Col } from "react-bootstrap";
import { deleteBasketItem } from '../http/basketApi';
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

import { createBasketItem } from '../http/basketApi';

const BasketItem = observer(({basketitem}) => {
    const {basketItem} = useContext(Context)
    const navigate = useNavigate()
    const handleClick = () => navigate("/product" + "/" + basketitem.id);
    
    console.log("Количество",basketitem.quantity)
    const userId = localStorage.getItem('user_id');
    console.log(userId,basketitem.id)
    const [quantity, setQuantity] = useState(basketitem.quantity);
    const [qPrice, setQPrice] = useState(basketitem.Qprice);
    // const [total, setTotal] = useState(basketitem.totalPrice);


    const removeBasketItem = useCallback(() => {
        deleteBasketItem(userId, basketitem.product.id).then((data) => {
          alert(`Товар ${basketitem.product.name} успешно удален!`);
          // Обновление состояния корзины
        //   basketItem.setBasketItems(prevItems => prevItems.filter(item => item.id !== basketitem.product.id));
          // Или:
          fetchBasketItem(userId).then(data => basketItem.setBasketItems(data));
        });
      }, [userId, basketitem.product.id, basketItem]);
      

    console.log(basketitem)

    
    useEffect(() => {
      setQPrice(basketitem.product.price * quantity);
    }, [quantity, basketitem.product.price]);


  // Внутри функций handleIncrement и handleDecrement передавайте актуальное значение quantity
  const handleIncrement = () => {
      setQuantity(prevQuantity => {
          const updatedQuantity = prevQuantity + 1;
          const formData = new FormData();
          formData.append('userId', userId);
          formData.append('productId', basketitem.product.id);
          formData.append('quantity', updatedQuantity); // Передаем обновленное значение
          formData.append('QPrice', basketitem.product.price);
          // formData.append('totalPrice', basketitem.totalPrice);
          console.log("ididididid", userId)
          createBasketItem(formData).then((data) => {
              // basketItem.setTotalPrice(basketitem.totalPrice)
              // basketItem.setTotalPrice(basketItem.totalPrice*1)
              console.log(data, basketItem.totalPrice, "-----+-----");
              
          });
          
          return updatedQuantity;
      });
  };
        // console.log(basketitem.totalPrice)
  const handleDecrement = () => {
      if (quantity > 1) {
          setQuantity(prevQuantity => {
              const updatedQuantity = prevQuantity - 1;
              const formData = new FormData();
              formData.append('userId', userId);
              formData.append('productId', basketitem.product.id);
              formData.append('quantity', updatedQuantity); // Передаем обновленное значение
              formData.append('QPrice', basketitem.product.price);
              // formData.append('totalPrice', basketitem.totalPrice);
              // fetchBasketItem(userId).then(data => basketItem.setTotalPrice(basketitem.totalPrice));
              createBasketItem(formData).then(() => {
                // basketItem.setTotalPrice(basketItem.totalPrice)
                  console.log(formData);
              });
              return updatedQuantity;
          });
      }
  };

    return (
        <Stack direction="horizontal" gap={3} className="m-3" style={{background:"#E9EDC9"}}>

            
                <Image width='20%' src={process.env.REACT_APP_API_URL + basketitem.product.img} style={{cursor:'pointer'}}
                        onClick={handleClick}/>
            

            <div className="p-2 ml-auto">
                <h3 onClick={handleClick} className='mb-2'>{basketitem.product.name}</h3>
                <h4>Цена: {basketitem.product.price} рублей</h4>
                <h4>Цена общ: {qPrice} рублей</h4>
            </div>

            <div className="p-2 ms-auto">
                <h4>Количество</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <Button variant="light" style={{marginRight:'7%'}} onClick={handleDecrement}>-</Button>
                    <div>{quantity}</div>
                    <Button variant="light" style={{marginLeft:'7%'}} onClick={handleIncrement}>+</Button>
                </div>
            </div>
            
            <div className="vr" />

            <div>
                <Button variant="outline-danger" onClick={removeBasketItem}>Удалить</Button>
            </div>
            {/* <h2>bj{total}</h2> */}
    </Stack>
    
    );
});

export default BasketItem;
