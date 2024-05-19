import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavigationCat from '../components/navig-category';
import ProductList from '../components/ProductList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchCategories, fetchProducts } from '../http/productApi';
import Pages from '../components/Pages';

const Catalog = observer( () => {
    const {product} = useContext(Context)

    useEffect( () => {
        fetchCategories().then(data => product.setCategories(data))
        // fetchProducts(null, 1, 3).then(data => {
        //     product.setProducts(data.rows);
        //     product.setTotalCount(data.count);
        // })
    }, [])

    useEffect( ()=>{
        fetchProducts(product.selectedCategory.id, product.page, 2).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    },[product.page, product.selectedCategory])

    return (
    <Container>
        <Row className='mt-5'>
            <Col md={3}>
                <NavigationCat />
            </Col>
            <Col md={9}>
                <ProductList />
                <Pages></Pages>
            </Col>
            
        </Row>
    </Container>
    )
})

export default Catalog