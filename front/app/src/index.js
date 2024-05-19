import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore';
import BasketItemStore from './store/BasketItemStore';
import OrderStore from './store/OrderStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore(),
      basketItem: new BasketItemStore(),
      order: new OrderStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
reportWebVitals();
