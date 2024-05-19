import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'
import { createCategory } from '../../http/productApi';

const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addCategory = () => {
        createCategory({name: value}).then(data => {setValue('')})
        onHide()
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
                Добавить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='{Введите название Категории' 
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addCategory}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;