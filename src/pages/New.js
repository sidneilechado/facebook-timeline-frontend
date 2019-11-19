import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {
  state = {
    author: '',
    content: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    await api.post('posts', {
      author: `${this.state.author}`,
      content: `${this.state.content}`,
    });

    this.props.history.push('/feed');
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="content"
          placeholder="Content"
          maxLength="140"
          onChange={this.handleChange}
          value={this.state.content}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
