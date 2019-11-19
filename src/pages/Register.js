import React, { Component } from 'react';
import api from '../services/api';

import './Register.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    await api.post('user', {
      name: `${this.state.name}`,
      email: `${this.state.email}`,
      password: `${this.state.password}`,
    });

    this.props.history.push('/login');
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="register" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default Register;
