import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('./users')
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: res
        })
      })
      .catch(err => {
        // do some horrendous error handling
      })
  }

  render() {
    return (
      <div className="App">
        <h1>mmm</h1>
        <ul>
        {this.state.users.map(user =>
          <li key={user.id}>{user.username}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
