import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Bootstrap 3.2.0
import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/bootstrap.min.css';

// Third-Party CSS
import './assets/css/bootstrap-modal.css';
import './assets/css/owl.carousel.css';

// 제작자 자체 CSS
import './assets/css/sidewaze_base.css';
import './assets/css/sidewaze_columns.css';
import './assets/css/sidewaze_base_color.css';
import './assets/css/soft-gray.css';

// Static Components
import NavigationColumn from './components/static/navigation_column';
import LogoColumn from './components/static/logo_column';
import FooterColumn from './components/static/footer_column';
import ToTop from './components/static/to_top';

// Dynamic Components
import PostsIndex from './components/dynamic/posts_index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationColumn/>
        <LogoColumn/>
        <BrowserRouter>
          <Switch>
            <Route to="/" component={PostsIndex}/>
          </Switch>
        </BrowserRouter>
        <FooterColumn/>
        <ToTop/>
      </div>
    );
  }
}

export default App;
