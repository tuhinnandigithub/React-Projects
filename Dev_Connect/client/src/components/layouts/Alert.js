import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const Alert = props => {
    return (
        <div>
            {
                props.alerts !== undefined &&
                 props.alerts.length > 0 && 
                 props.alerts.map(p=><div key={p.id} className={`alert alert-${p.alertType}`}>
                    {p.msg}
                </div>)
            }
        </div>
    )
}

Alert.propTypes = {
    alerts:PropTypes.array.isRequired,
}

const mapStateToProps =state=>({
    alerts:state.alert
})

export default connect(mapStateToProps)(Alert);
