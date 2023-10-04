import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        {isLoggedIn ? (
          <>
            <button onClick={() => history.push('/')}>Home</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => history.push('/login')}>Login</button>
            <button onClick={() => history.push('/register')}>Register</button>
          </>
        )}
      </header>

      <Switch>
        <Route path="/login" exact>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/" exact>
          {isLoggedIn ? <TodoList /> : <p>Please login to view todos</p>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;


