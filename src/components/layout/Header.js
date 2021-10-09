import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';

import styled from 'styled-components';
import { mobile } from '../../responsive';

import Search from './Search';

import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>FAINA TECH</Logo>
          </Link>
        </Left>
        {location.pathname === `/` && (
          <Center>
            <Route render={({ history }) => <Search history={history} />} />
          </Center>
        )}
        <Right>
          {isAuthenticated === true ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <>
                {' '}
                <MenuItem>
                  <Link to="/register">REGISTER</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/login">SIGN IN</Link>
                </MenuItem>
              </>
            )
          )}
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
  background-color: #286077;
  margin-bottom: 10px;
  position: sticky;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  /* justify-content: space-evenly; */
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 2;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
