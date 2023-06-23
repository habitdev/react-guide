#### Users.js

```js
import { useState, Component } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
      // moreState: 'Test',
    };
  }
  toggleUsersHandler() {
    // this.state.showUsers = false; // 절대 하면 안된다!
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
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
        <button onClick={this.toggleUsersHandler.bind(this)}>{this.state.showUsers ? 'Hide' : 'Show'} Users</button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

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
import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

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

# 컴포넌트 수명주기

`componentDidMount()`: 리액트가 마운트 된 후 => 컴포넌트가 평가되고 DOM에 렌더링 될 때: useEffect(..., [])
`componentDidUpdate()`: 컴포넌트가 갱신된 경우: useEffect(..., [someValue])
`componentWillUnmount()`: 컴포넌트가 DOM에서 삭제되기 직전에 호출: useEffect(()=> {return () => {}}, [someValue]) // cleanUp
등등
