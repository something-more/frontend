import React, { Component } from 'react';
import { connect } from 'react-redux';
import Users from './fields/settings_users';
import NewPasswords from './fields/settings_passwords';
import Destroy from './fields/settings_destroy';

class SettingsFields extends Component {

  render() {
    switch (this.props.onStatusChange) {
      case 'admin':
        return(<Users/>);

      case 'password':
        return (<NewPasswords/>);

      case 'destroy':
        return (<Destroy/>);

      default:
        return null
    }
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}

export default connect(mapStateToProps)(SettingsFields);
