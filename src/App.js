import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

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
import LogoColumn from './components/static/logo_column';
import FooterColumn from './components/static/footer_column';
import ToTop from './components/static/to_top';
import About from './components/static/about';

// Dynamic Components
import NavigationColumn from './components/dynamic/structure/navigation_column';
import PostsIndex from './components/dynamic/posts/posts_index';
import AuthorDetail from './components/dynamic/posts/author_detail';
import LoginModal from './components/dynamic/auth/login_modal';
import SignUpModal from './components/dynamic/auth/signup_modal';
import AdminSignUp from './components/dynamic/auth/admin_signup';
import Dashboard from './components/dynamic/profile/dashboard';

// Private Route
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('token')
      ? (<Component {...props}/>)
      : (<Redirect to='/'/>)}
  />
);

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <NavigationColumn/>
        <LogoColumn/>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route path="/authors/:id" component={AuthorDetail}/>
            <Route path="/about" component={About}/>
            <Route path="/st-more-admin" component={AdminSignUp}/>
            <Route exact path="/" component={PostsIndex}/>
            <Route path="*" component={PostsIndex}/>
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
