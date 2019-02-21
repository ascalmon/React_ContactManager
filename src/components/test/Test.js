import React, { Component } from 'react';


class  Test extends Component {

  state = {
    name: '',
    email: '',
    phone: ''
    //test: 'test'
  }

  componentDidMount() {
    //console.log('componentDidMount...');
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => this.setState({
        name: data.name,
        email: data.email,
        phone: data.phone
      })
    );
  }

  // componentWillMount() {
  //   console.log('componentWillMount...');
  // }
  //
  // componentDidUpdate() {
  //   console.log('componentDidUpdate...');
  // }
  //
  // componentWillUpdate() {
  //   console.log('componentWillUpdate...');
  // }
  //
  // // Data coming from Redux
  // componentWillReceiveProps(nextProps, nextStatetate) {
  //   console.log('componentWillReceiveProps...');
  // }
  //
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     test: 'null'
  //   };
  // }
  //
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(' getSnapshotBeforeUpdate...')
  // }

  render() {
    const { name, email, phone } = this.state;
    return (

      <div>
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    );
  }
}

export default Test;
