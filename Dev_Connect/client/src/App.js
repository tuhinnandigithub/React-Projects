import React ,{Fragment, useEffect} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUsers } from './actions/auth';
import store from './store/store'
import { Provider } from 'react-redux';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App(props) {

  useEffect(() => {
    store.dispatch(loadUsers());
  },[])
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <section className='container'>
          <Alert/>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>            
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
