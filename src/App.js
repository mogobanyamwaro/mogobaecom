import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Admin Imports
import Dashboard from './components/admin/pages/home/Dashboard';
import ProductsList from './components/admin/pages/productList/ProductList';
import UpdateProduct from './components/admin/pages/updateProduct/UpdateProduct';
import NewProduct from './components/admin/pages/newProduct/NewProduct';
import ProcessOrder from './components/admin/pages/processOrder/ProcessOrder';
import OrdersList from './components/admin/pages/orderList/OrdersList';
import UserList from './components/admin/pages/userList/UserList';
import ProductReviews from './components/admin/pages/productReview/ProductReviews';
import UpdateUser from './components/admin/pages/updateuser/UpdateUser';

import ProtectedRoute from './components/route/ProtectedRoute';

import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import store from './store';

function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />

          <ProtectedRoute path="/payment" component={Payment} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>
        <div className="container_dashboard">
          <Switch>
            <ProtectedRoute
              path="/dashboard"
              isAdmin={true}
              component={Dashboard}
              exact
            />
            <ProtectedRoute
              path="/admin/products"
              isAdmin={true}
              component={ProductsList}
              exact
            />
            <ProtectedRoute
              path="/admin/product/:id"
              isAdmin={true}
              component={UpdateProduct}
              exact
            />
            <ProtectedRoute
              path="/admin/product/new"
              isAdmin={true}
              component={NewProduct}
              exact
            />
            <ProtectedRoute
              path="/admin/order/:id"
              isAdmin={true}
              component={ProcessOrder}
              exact
            />
            <ProtectedRoute
              path="/admin/orders"
              isAdmin={true}
              component={OrdersList}
              exact
            />
            <ProtectedRoute
              path="/admin/users"
              isAdmin={true}
              component={UserList}
              exact
            />
            <ProtectedRoute
              path="/admin/reviews"
              isAdmin={true}
              component={ProductReviews}
              exact
            />
            <ProtectedRoute
              path="/admin/user/:id"
              isAdmin={true}
              component={UpdateUser}
              exact
            />
            {/* 
           
          
          
         
             */}
          </Switch>
        </div>
        {!loading && (!isAuthenticated || user.role !== 'admin') && <Footer />}
      </div>
    </Router>
  );
}

export default App;
