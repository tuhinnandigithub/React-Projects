import React from 'react'
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/' component={HomeScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
