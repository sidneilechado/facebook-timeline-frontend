import React, { Component } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import api from '../services/api';

import like from '../assets/like.svg';

import './Feed.css';

class Feed extends Component {
  state = {
    feed: [],
    following: [],
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('/posts', {
      _id: `${localStorage.getItem('user_id')}`,
    });

    this.setState({ feed: response.data });

    const responseUser = await api.post('/user/getUserId', {
      _id: `${localStorage.getItem('user_id')}`,
    });

    this.setState({ following: responseUser.data.following });

    console.log(this.state.following);
  }

  registerToSocket = () => {
    const socket = io('http://localhost:4000');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        ),
      });
    });
  };

  handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        <div id="logout">
          <Link to="/">
            <button onClick={this.handleLogout}>Logout</button>
          </Link>
        </div>
        {this.state.feed.map(post =>
          this.state.following.includes(post.author) ? (
            <article key={post._id}>
              <header>
                <div className="user-info">
                  <span>{post.author}</span>
                  <p className="content">{post.content}</p>
                  <span id="span-likes">{post.likes} likes</span>
                </div>
              </header>

              <footer>
                <div className="actions">
                  <button
                    type="button"
                    onClick={() => this.handleLike(post._id)}
                  >
                    <img src={like} alt="like" />
                  </button>
                </div>
              </footer>
            </article>
          ) : (
            <p></p>
          )
        )}
      </section>
    );
  }
}

export default Feed;
