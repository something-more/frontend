import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Bootstrap 3.2.0
import 'bootstrap/dist/js/bootstrap.min';
import './static/css/bootstrap.min.css';

// Third-Party CSS
import './static/css/bootstrap-modal.css';
import './static/css/owl.carousel.css';

// 제작자 자체 CSS
import './static/css/sidewaze_base.css';
import './static/css/sidewaze_columns.css';
import './static/css/sidewaze_base_color.css';
import './static/css/soft-gray.css';

// Static Components
import NavigationColumn from './components/navigation_column';
import LogoColumn from './components/logo_column';
import FooterColumn from './components/footer_column';
import ToTop from './components/to_top';

// Dynamic Components
import PostsIndex from './components/posts_index';

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
