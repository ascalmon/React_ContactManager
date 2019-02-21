import React , { Component } from 'react';
import axios from 'axios';


const Context = React.createContext();

const reducer = (state, action) => {
  //console.log(state, action);
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state, // Spread operator
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload,
        ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? (contact = action.payload) : contact)
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  //Global state
  state = {
    contacts: [],

    dispatch: action => this.setState(state => reducer(state,action))
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.setState({contacts: res.data}));
  }

  componentDidUpdate() {
    //console.log('componentDidUpdate...');
  }

  componentWillUpdate() {
    //console.log('componentWillUpdate...');
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
