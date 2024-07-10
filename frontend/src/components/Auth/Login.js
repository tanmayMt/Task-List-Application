
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
