import React from 'react';
// import UserItem from './UserItem';
import Card from '../UI/Card';
import classes from './UserList.module.css';

function UserList(props) {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={user.id}>
              {props.username} ({props.age} years old)
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default UserList;
