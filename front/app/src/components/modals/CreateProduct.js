import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Button, Dropdown} from 'react-bootstrap'
import {Context} from "../../index";

import { createProduct, fetchCategories } from '../../http/productApi';
import { observer } from 'mobx-react-lite';

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
 
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [file, setFile] = useState(null)
    const [availability, setAvailability] = useState()
    const [volume, setVolume] = useState(null)

    useEffect( () => {
        fetchCategories().then(data => product.setCategories(data))
    }, []) 

    const selectFile = e => {
        setFile(e.target.files[0])
    } 

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('volume', volume)
        formData.append('availability', availability)
        formData.append('categoryId', product.selectedCategory.id)
        formData.append('description', description)
        formData.append('top_notes', top)
        formData.append('bottom_notes', bottom)
        createProduct(formData).then(data => onHide())
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
                Добавить Товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mb-2 mt-2'>
                        <Dropdown.Toggle>{product.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.categories.map(category =>
                                <Dropdown.Item 
                                    onClick={() => product.setSelectedCategory(category)} 
                                    key={category.id}>
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className='mb-2 mt-2'
                        value = {name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Введите название товара' 
                    />

                    <Form.Control className='mb-2 mt-2'
                        value = {price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder='Введите Цену' 
                    />

                    <Dropdown className='mb-2 mt-2'>
                        <Dropdown.Toggle>Объем: {volume}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item volume={10} onClick={() => setVolume(10)}>10</Dropdown.Item>
                        <Dropdown.Item volume={30} onClick={() => setVolume(30)}>30</Dropdown.Item>
                        <Dropdown.Item volume={50} onClick={() => setVolume(50)}>50</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className='mb-2 mt-2'
                        value = {description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Введите Описание' 
                    />

                    <Form.Control className='mb-2 mt-2'
                        value = {top}
                        onChange={e => setTop(e.target.value)}
                        placeholder='Введите Вверхние ноты' 
                    />

                    <Form.Control className='mb-2 mt-2'
                        value = {bottom}
                        onChange={e => setBottom(e.target.value)}
                        placeholder='Введите Нижние ноты' 
                    />

                    <Form.Control className='mb-2 mt-2'
                        value = {availability}
                        onChange={e => setAvailability(Number(e.target.value))}
                        placeholder='Введите количество товара' 
                    />

                    <Form.Control className='mb-2 mt-2'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr></hr>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addProduct}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;