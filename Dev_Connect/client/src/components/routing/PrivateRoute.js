import React from 'react'
import {useHistory,Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const history = useHistory();
    return(
        <Route
                {...rest}
                render={
                    props=>!auth.isAuthenticated && !auth.loading ? 
                (history.push('/login')) : 
                (<Component {...props}/>)} />
    )
}
                
PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired,
}

const mapStateToProps =state=>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
