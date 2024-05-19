import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import BasketItem from './BasketItem';

const BasketList = observer(() => {
    const {basketItem} = useContext(Context)
    return (
        <Row className="d-flex">
        {basketItem.basketItems.map((basketitem, index) => (
            <BasketItem key={index} basketitem={basketitem} />
        ))}
    </Row>
    );
});

export default BasketList;
