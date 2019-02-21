import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

//class Component
class Contact extends Component {


  // Static or out of the class as specified below
  // Static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   phone: PropTypes.string.isRequired,
  // };

  state = {
    showContactInfo: false
  };

  onDeleteClick = (id, dispatch) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => dispatch({type: 'DELETE_CONTACT', payload: id}))
  };

  onShowClick = (e) => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  render() {

    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down" style={{ cursor: 'pointer' }}>
                </i>
                <i className="fas fa-times"
                   style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                   onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                <i className="fas fa-pencil-alt"
                   style={{
                     cursor: 'pointer',
                     float: 'right',
                     color: 'black',
                     marginRight: '1rem'
                   }}
                ></i>
                </Link>

              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

// Validates the expected type of defined props
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
