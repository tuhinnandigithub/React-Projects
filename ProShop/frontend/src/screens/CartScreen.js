import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import { Row, Col, Form, Card, Image, ListGroup, Button, ListGroupItem } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ history,match, location}) => {

  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const { cartItems } = cart

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch, productId, qty])

  const removeFromCartHandler = () => {

  }

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
        <Message>
          Your Cart is Empty <Link to='/'>Go Back</Link>
        </Message>
        ) : (
        <ListGroup variant='flush'>
          {
            cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src = {item.image} alt = {item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                  <Form.Control as='select' value = {qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value = {x+1}> {x + 1} </option>
                                            ))}
                                        </Form.Control>
                  </Col>
                  <Col md={2}>
                    <button type = 'button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>)}
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> SubTotal({cartItems.reduce((acc, item) => acc + item.qty , 0)}) items</h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' 
                className='btn-block' 
                disabled = {cartItems.length === 0} 
                onClick={checkOutHandler}>
                  Proceed to CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
      </Col>
    </Row>
  )
}

export default CartScreen