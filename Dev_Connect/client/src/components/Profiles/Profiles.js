import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem'

function Profiles({getAllProfiles, profile : {profiles, loading}}) {

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

  return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connecteddevelop'></i> Browse and Connect with Developers</p>
           <div className='profiles'>
            {profiles.length > 0 ? (
                profiles.map((profile) => 
                <ProfileItem key={profile._id} profile={profile} />) 
            ) : <h4>No Profile Found...</h4>}
            </div>     
        </Fragment>}
    </Fragment>
}


Profiles.propTypes = {
    getAllProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, {getAllProfiles})(Profiles);
