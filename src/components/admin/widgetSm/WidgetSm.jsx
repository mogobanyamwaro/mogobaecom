import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { allUsers } from '../../../actions/userActions';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

export default function WidgetSm() {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user, index) => {
          return (
            <li key={index} className="widgetSmListItem">
              <img src={user && user.img} alt="" className="widgetSmImg" />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user && user.name}</span>
                <span className="widgetSmUserTitle">{user && user.title}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
