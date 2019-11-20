import React, { Component } from 'react';
import './App.css';
import Mform from '../mform/Mform';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
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
        throw err
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user => <li key={user.username}>{user.username}</li>)}
        </ul>
        <Mform inputs="text text password"></Mform>
      </div>
    );
  }
}

export default App;
