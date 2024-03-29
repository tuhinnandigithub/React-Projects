import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { logOut } from '../actions/userActions'

const Header = () => {
 
  const dispatch = useDispatch()

  const userLogIn = useSelector(state => state.userLogIn)
  const {userInfo} = userLogIn


  const logOutHandler = () => {
    dispatch(logOut())
  }
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <LinkContainer to='/cart'>
                    <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                  </LinkContainer>
                  {userInfo ? 
                    (<NavDropdown title={userInfo.name} id='userName'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logOutHandler}></NavDropdown.Item>
                    </NavDropdown>
                    ) : 
                  <LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                  </LinkContainer>
                }                 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header