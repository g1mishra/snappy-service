import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavbarComp from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Home = React.lazy(() => {
  return import('./pages/Home');
});
const Error = React.lazy(() => {
  return import('./pages/Error');
});
const Service = React.lazy(() => {
  return import('./pages/Services');
});
const Worker = React.lazy(() => {
  return import('./pages/Pro-Worker');
});
const Customer = React.lazy(() => {
  return import('./pages/Customer');
});
const Hire = React.lazy(() => {
  return import('./pages/Hire');
});
const RegisterForm = React.lazy(() => {
  return import('./components/account/Signup/RegisterForm');
});
const Login = React.lazy(() => {
  return import('./components/account/Login/Login');
});
const Profile = React.lazy(() => {
  return import('./components/account/Profile/Profile');
});
const Register = React.lazy(() => {
  return import('./components/account/Signup/Register');
});
const SuccessfullyRegitsered = React.lazy(() => {
  return import('./components/account/Signup/SuccessfullyRegitsered');
});

function App() {
  return (
    <Fragment>
      <NavbarComp />
      <React.Suspense
        fallback={
          <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
            <div className='spinner-border' role='status' style={{ width: '3rem', height: '3rem' }}>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        }
      >
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/service' component={Service} />
          <Route path='/pro-worker' component={Worker} />
          <Route path='/customer' component={Customer} />
          <Route path='/join-as' component={Register} />
          <Route path='/signup' component={RegisterForm} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/hire' component={Hire} />
          <Route path='/registered' component={SuccessfullyRegitsered} />
          <Route
            path='*'
            render={() => {
              return <Error />;
            }}
          />
        </Switch>
      </React.Suspense>
      <Footer />
    </Fragment>
  );
}

export default App;
