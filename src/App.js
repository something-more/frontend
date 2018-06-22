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
import FooterColumn from './components/static/footer_column';
import ToTop from './components/static/to_top';
import About from './components/static/about';

// Dynamic Components
import NavigationColumn from './components/dynamic/navigation_column';
import LogoColumn from './components/dynamic/logo_column';
import PostsIndex from './components/dynamic/posts_index';
import AuthorDetail from './components/dynamic/author_detail';
import LoginModal from './components/dynamic/login_modal';
import SignUpModal from './components/dynamic/signup_modal';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <NavigationColumn/>
        <LogoColumn/>
          <Switch>
            <Route path="/authors/:id" component={AuthorDetail}/>
            <Route path="/about" component={About}/>
            <Route exact path="/" component={PostsIndex}/>
          </Switch>
        <FooterColumn/>
        <ToTop/>
        <LoginModal/>
        <SignUpModal/>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
