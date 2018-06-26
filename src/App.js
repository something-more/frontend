import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import moment from 'moment';

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
import Stories from './components/dynamic/stories/list_story';
import WriteStory from './components/dynamic/stories/create_story';
import StoryDetail from './components/dynamic/stories/retrieve_story';

// Helper function
import { decodeJWT } from "./include/jwt_decode";

// Private Route
// 라우트의 컴포넌트와 기타 등등을 모두 상속받음
// 토큰이 있다면 입장할 수 있고, 토큰이 없다면 홈페이지로 리다이렉트
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
    sessionStorage.getItem('token') && // 토큰이 존재하면서 동시에 expired 되지 않았을 때
    (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
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
            <PrivateRoute path="/me/write" component={WriteStory}/>
            <PrivateRoute path="/me/stories/:id" component={StoryDetail}/>
            <PrivateRoute path="/me/stories" component={Stories}/>
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
