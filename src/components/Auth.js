import React, { Component } from 'react';
import api from '../services/api';
import { withRouter } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.props.history.push('/login');
    }

    api
      .get('/user', { headers: { Authorization: `Bearer ${jwt}` } })
      .then(res =>
        res.setState({
          user: res.data,
        })
      );
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Auth);
