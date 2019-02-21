import React, { Component } from 'react';
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
//import uuid from 'uuid';

class EditContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };


  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value });
    //console.log(e.target.name, e.target.value, e.target);
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    //console.log(this.state);
    const { name, email, phone } = this.state;

    //Check for errors
    if(name === '') {
      this.setState({errors: { name: 'Name is required' }});
      return;
    }
    if(email === '') {
      this.setState({errors: { email: 'Email is required' }});
      return;
    }
    if(phone === '') {
      this.setState({errors: { phone: 'Phone is required' }});
      return;
    }

    const updContact = {
      name: name,       // Could be only name, key and value equal
      email: email,
      phone: phone
    };
    const { id } = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);
    dispatch({type: 'UPDATE_CONTACT', payload: res.data });

    //Clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    });
    // Redirect to home page
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;
    //console.log(Consumer);
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(
            <div className="card mb-3">
              <div className="card-header">
                Edit Contact
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />

                    <input type="submit" value="Update Contact"
                    className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>

          )
        }}
      </Consumer>
    )
  }
}

export default EditContact;
