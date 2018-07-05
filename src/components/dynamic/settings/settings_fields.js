import React, { Component } from 'react';
import { connect } from 'react-redux';
import Default from './fields/settings_default';
import Users from './fields/settings_users';
import NewNickname from './fields/settings_nickname';
import NewPasswords from './fields/settings_passwords';
import Destroy from './fields/settings_destroy';

class SettingsFields extends Component {
  render() {
    switch (this.props.onStatusChange) {
      case 'admin':
        return (<Users />);

      case 'nickname':
        return (<NewNickname />);

      case 'password':
        return (<NewPasswords />);

      case 'destroy':
        return (<Destroy />);

      default:
        return (<Default />);
    }
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default connect(mapStateToProps)(SettingsFields);
