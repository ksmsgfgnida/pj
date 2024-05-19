import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";
import './App.css'

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => setLoading(false))
    }, 1000)
  }, [])

  if (loading) {
    return <Spinner animation='grow' />
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
