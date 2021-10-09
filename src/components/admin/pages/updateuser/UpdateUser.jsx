import React, { Fragment, useState, useEffect } from 'react';
import './updateuser.css';
import MetaData from '../../../layout/MetaData';
import Sidebar from '../../sidebar/Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from '../../../../actions/userActions';
import { UPDATE_USER_RESET } from '../../../../constants/userConstants';

const UpdateUser = ({ history, match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User updated successfully');

      history.push('/admin/users');

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <>
        <>
          <Sidebar />
        </>

        <div className="newProduct">
          <>
            <>
              <h1 className="addProductTitle">Update User</h1>
              <form className="addProductForm" onSubmit={submitHandler}>
                <div className="addProductItem">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="addProductItem">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="addProductItem">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button type="submit" className="addProductButton">
                  Update
                </button>
              </form>
            </>
          </>
        </div>
      </>
    </Fragment>
  );
};

export default UpdateUser;
