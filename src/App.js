import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
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
import './assets/css/font_face.css';
import './assets/css/transition.css';
import './assets/css/carousel_grid.css';
import './assets/css/landing_page.css';
import './assets/css/quill_custom.css';

// 동적 로딩
import {
  FooterColumn, About,
  PostsIndex, AuthorDetail, AuthorStoryList, SettingsIndex,
  LoginModal, SignUpModal, AdminSignUp,
  ListStory, CreateStory, RetrieveStory, PatchStory,
  ListFreeBoard, CreateFreeBoard, RetrieveFreeBoard, PatchFreeBoard,
  ListNotice, CreateNotice, RetrieveNotice, PatchNotice,
} from './route/lazy';

// 정적 로딩
import LandingPage from './components/dynamic/structure/landing_page';
import ToTop from './components/static/to_top';
import NavigationColumn from './components/dynamic/structure/navigation_column';
import LogoColumn from './components/static/logo_column';
import FauxColumn from './components/static/faux_column';

// Helper function
import decodeJWT from './include/jwt_decode';

// Private Route
// 라우트의 컴포넌트와 기타 등등을 모두 상속받음
// 토큰이 있다면 입장할 수 있고, 토큰이 없다면 홈페이지로 리다이렉트
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (sessionStorage.getItem('token') // 토큰이 존재하면서 동시에 expired 되지 않았을 때
    && (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
      ? (<Component {...props} />)
      : (<Redirect to="/" />))}
  />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <LandingPage />
          <NavigationColumn />
          <LogoColumn />
          <div className="content-col">
            <Switch>
              <PrivateRoute path="/notice/patch/:id" component={PatchNotice} />
              <PrivateRoute path="/notice/write" component={CreateNotice} />
              <Route path="/notice/:id" component={RetrieveNotice} />
              <Route path="/notice" component={ListNotice} />
              <PrivateRoute path="/board/patch/:id" component={PatchFreeBoard} />
              <PrivateRoute path="/board/write" component={CreateFreeBoard} />
              <Route path="/board/:id" component={RetrieveFreeBoard} />
              <Route path="/board" component={ListFreeBoard} />
              <PrivateRoute path="/me/write" component={CreateStory} />
              <PrivateRoute path="/me/stories/:id" component={PatchStory} />
              <PrivateRoute path="/me/settings" component={SettingsIndex} />
              <PrivateRoute path="/me/stories" component={ListStory} />
              <Route path="/stories/public/:id" component={AuthorStoryList} />
              <Route path="/stories/:id" component={RetrieveStory} />
              <Route path="/authors/:id" component={AuthorDetail} />
              <Route path="/about" component={About} />
              <Route path="/st-more-admin" component={AdminSignUp} />
              <Route exact path="/" component={PostsIndex} />
              {/*<Route path="*" component={PostsIndex} />*/}
            </Switch>
          </div>
          <FooterColumn />
          <FauxColumn />
          <ToTop />
          {(sessionStorage.getItem('token') // 토큰이 존재하면서 동시에 expired 되지 않았을 때
          && (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix()))
            ? null
            : (
              <Fragment>
                <LoginModal />
                <SignUpModal />
              </Fragment>
            )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
