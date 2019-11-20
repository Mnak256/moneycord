import React, { Component } from 'react';
import './Mform.css';

class Mform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.inputsArr = this.props.inputs.split(' ')
    // console.log(this.inputsArr)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    console.log('Changed')
    // console.log(this.inputsArr)
    event.preventDefault()
  }

  handleSubmit(event) {
    console.log('submitted')
    event.preventDefault()
  }

  render() {
    let inputFieldsIndex = 0
    return (
      <form>
        {this.inputsArr.map(inputType => <input key={`input-${inputFieldsIndex++}`} type={inputType} />)}
        <input type="submit" />
      </form>
    )
    // return (
    //   <form method="GET" onSubmit={this.handleSubmit}>
    //     <input type="text" name="username-text" value={this.state.value} onChange={this.handleChange}/>
    //     <input type="password" name="password-text" />
    //     <input type="submit" value="Login" />
    //   </form>
    // )
  }
}

export default Mform
