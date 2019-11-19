import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import like from '../assets/like.svg';

import './Feed.css';

class Feed extends Component {
  state = {
    feed: [],
    tag: '',
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts', {
      _id: `${localStorage.getItem('user_id')}`,
    });

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');

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

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
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
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
