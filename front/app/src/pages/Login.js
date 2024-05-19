import React, {useContext, useState, useEffect} from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Card, Button} from "react-bootstrap";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE,  } from '../utils/consts';


import {login, registration} from '../http/userApi';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Login = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        let data;
        try {
            
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
            alert('Вы успешно вошли')
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight-54}}>
            <Card style={{width: '40%'}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control className='mt-4' placeholder='Введите email..' value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Control className='mt-4' placeholder='Введите пароль..' value={password} onChange={e => setPassword(e.target.value)} />
                    <Button className='mt-4' onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    {isLogin ?
                        <div className='d-flex mt-5 justify-content-center align-items-center'>
                            Нет акаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                    :
                        <div className='d-flex mt-5 justify-content-center align-items-center'>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                </Form>
            </Card>
        </Container>
    )
})
export default Login