import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import rightIcon from "../assets/Значсправа.svg";
import leftIcon from "../assets/Значслева.svg";
import { PRODUCT_ROUTE } from '../utils/consts';
import { createBasketItem } from '../http/basketApi';

const ProductItem = ({product}) => {
    const navigate = useNavigate()

    return (
        <Col md={4} className='mb-2'>
            <Card style={{width: '100%', height: '100%', cursor: 'pointer'}} border='0' className='d-flex justify-content-center align-items-center p-3'>
                <Image width={'90%'} height={'90%'} src={process.env.REACT_APP_API_URL + product.img} />
                <div>
                    <div style={{textAlign:'center', textTransform: "uppercase", fontSize: '110%'}}>{product.name}</div>
                    <div style={{textAlign:'center'}}>Цена: {product.price}</div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Image width={'15%'} height={'15%'} src={leftIcon} style={{marginRight: '3%'}} />
                        <p style={{margin: '0', color:'#2FF5FF'}} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>Выбрать товар</p>
                        <Image width={'15%'} height={'15%'} src={rightIcon} style={{marginLeft: '3%'}} />
                    </div>
                    
                </div>
            </Card>
        </Col>
    );
};
 
export default ProductItem;