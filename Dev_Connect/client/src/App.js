import React ,{Fragment,useEffect} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadUser} from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';



function App(props) {
  useEffect(()=>{
    props.loadUser();
  },[])

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <section className='container'>
          <Alert/>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}
App.propTypes={
  loadUser:PropTypes.func.isRequired,
}
export default connect(null,{loadUser})(App);
