import React, { Component } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    await api
      .post('/login', {
        email: `${this.state.email}`,
        password: `${this.state.password}`,
      })
      .then(res => localStorage.setItem('jwt', res.data.token));

    await api
      .post('/user/getUser', {
        email: `${this.state.email}`,
      })
      .then(res => localStorage.setItem('user_id', res.data));

    this.props.history.push('/feed');
  };

  render() {
    return (
      <form id="login" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <div id="login-buttons">
          <button type="submit">Login</button>

          <Link to="/register">
            <button type="submit">Registrar</button>
          </Link>
        </div>
      </form>
    );
  }
}

export default Login;
