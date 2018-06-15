import React, { Component } from 'react';

// Bootstrap 3.2.0
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';

// Third-Party CSS
import './static/css/bootstrap-modal.css';
import './static/css/owl.carousel.css';

// 제작자 자체 CSS
import './static/css/sidewaze_base.css';
import './static/css/sidewaze_columns.css';
import './static/css/sidewaze_base_color.css';
import './static/css/soft-gray.css';

// Components
import NavigationColumn from './components/navigation_column';
import LogoColumn from './components/logo_column';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationColumn/>
        <LogoColumn/>
      </div>
    );
  }
}

export default App;
