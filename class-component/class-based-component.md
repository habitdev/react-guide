#### Users.js

```js
import { useState } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User
          key={user.id}
          name={user.name}
        />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>{showUsers ? 'Hide' : 'Show'} Users</button>
      {showUsers && usersList}
    </div>
  );
};

export default Users;
```

#### User.js

```js
import classes from './User.module.css';

const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};

export default User;
```

#### App.js
```js
import Users from './components/Users';

function App() {
  return (
    <div>
      <Users />
    </div>
  );
}

export default App;

```
