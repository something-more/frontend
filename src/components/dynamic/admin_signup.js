import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class AdminSignUp extends Component {
  render() {
    return (
      <div className="content-col">
        hi
      </div>
    )
  }
}

export default reduxForm({
  form: 'AdminSignUpForm'
})(
  connect()(AdminSignUp)
);
