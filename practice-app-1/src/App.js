import { useState } from 'react';
import AddUser from './Components/Users/AddUser';
import UserList from './Components/Users/UserList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const onAddUserHandler = (username, userage) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, { username: username, age: userage, id: Math.random().toString() }];
    });
  };

  return (
    <div>
      <AddUser onAddUser={onAddUserHandler} />
      <UserList users={usersList} />
    </div>
  );
}

export default App;
