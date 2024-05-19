import {Button, Nav, Navbar, Container, } from "react-bootstrap";
import logo from "../assets/logo.svg";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import {observer} from 'mobx-react-lite';
import { ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, CONTACT_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";



const Header = observer(() => {
  const {user} = useContext(Context);
  console.log(user.isAuth)
  const navigate = useNavigate();
  const handleClickUser = () => navigate(LOGIN_ROUTE);
  const handleClickAdmin = () => navigate(ADMIN_ROUTE);
  const userId = localStorage.getItem('user_id');
  console.log(userId, 'айди с header')
  const handleClickBasket = () => navigate("/basket/" + userId);
  const logOut = () => {
    localStorage.removeItem('token'); // Удаление токена из localStorage
    localStorage.removeItem('user_id');
    user.setUser({});
    user.setIsAuth(false);
  };
  
  
  return (
    <>
      <Navbar  sticky="top" collapseOnSelect expand="md" variant="light" className="nav-centered header" style={{background: 'rgb(255,255,255, 0.5)'}}>
        <Container >
          <Navbar.Brand>
            <img src={logo} width="100" className="d-inline-block align-top" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to={HOME_ROUTE}>
                {" "}
                Главная
            </Nav.Link>
            <Nav.Link as={Link} to={CATALOG_ROUTE}>
                {" "}
                Каталог
            </Nav.Link>
            <Nav.Link as={Link} to={CONTACT_ROUTE}>
                {" "}
                Контакты
            </Nav.Link>
            <Nav.Link as={Link} to={ABOUT_ROUTE}>
                {" "}
                О нас
            </Nav.Link>
            </Nav>
            <Navbar.Brand>
            {user.isAuth ?
              <Nav className="mr-auto">
                <Nav.Link as={Link} to={ADMIN_ROUTE}>
                  Админ-панель
                </Nav.Link>
                <Nav.Link as={Link} to='/person'>
                {" "}
                  Личный кабинет
                </Nav.Link>
                <Button onClick={() => logOut()}>Выйти</Button>
                {/*<NavLink onClick={() => logOut()}>Выйти</NavLink>*/}
                {/* <NavLink to={BASKET_ROUTE}>Корзина</NavLink> */}
                <Button onClick={handleClickBasket}>Корзина</Button>
              </Nav>
              //<Button className='right' href="/basket">Корзина</Button>
              :
              <Button className='right' onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            }
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr></hr>

    </>
  );
});

export default Header;




