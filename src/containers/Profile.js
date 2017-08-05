import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileAction from '../actions/ProfileAction';
import $ from 'jquery';
import hostAddress from '../config';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            savedTrips: []
        }
    }

    componentDidMount() {
        const url = hostAddress + '/profile'
        $.getJSON(url,(data)=>{
            this.setState({
                savedTrips: data
            })
        })
    }

    render(){
        // console.log(this.props.registerInfo)
    	var userInfoArray = [
    		<div className="col-sm-6" key='1'>
    			<div>{this.props.registerInfo.name}</div>
    			<div>{this.props.registerInfo.email}</div>
    			<div>{this.props.registerInfo.gender}</div>
    		</div>
    	]

        var savedTripsArray = []

        this.state.savedTrips.map((trip, index)=>{
            if((this.state.savedTrips[index].email === this.props.registerInfo.email) && (this.state.savedTrips[index].tripType === undefined)){
                savedTripsArray.push(
                    <div className="text-center" key={index}>
                        No saved trips
                    </div>
                )
            }else if (this.state.savedTrips[index].email === this.props.registerInfo.email){
                savedTripsArray.push(
                    <div key={index}>
                        <div className="text-center">            
                            <div className="saved-trips-link">
                                <Link to="/listview">
                                    <div className="col-sm-4">{this.state.savedTrips[index].tripType}</div>
                                    <div className="col-sm-4">{this.state.savedTrips[index].tripSetting}</div>
                                    <div className="col-sm-4">{this.state.savedTrips[index].children}</div>
                                </Link>
                            </div>
                        </div>
                    </div> 
                )
            }
        })

        return(
        	<div className="user-profile col-sm-offset-4 col-sm-4">
            	<h1 className="text-center">User Profile</h1>
                <div className="row basic-user-info">
                	<div className="col-sm-6 text-right">
                		<div>Name:</div>
                		<div>Email:</div>
                		<div>Gender:</div>
                	</div>
                	{userInfoArray}
                </div>
            	<div className="row trip-user-info text-center">
            		<div><Link to="/survey"><i className="fa fa-plus" aria-hidden="true"></i> Add Trip</Link></div>
            	</div>
                <h4 className="row text-center">Saved Trips</h4>
                <div className="row text-center">            
                    <div>
                        <div className="saved-header col-sm-4">Trip Type</div>
                        <div className="saved-header col-sm-4">Setting</div>
                        <div className="saved-header col-sm-4">Children</div>
                    </div>
                </div>
                {savedTripsArray}
            </div>
        )
    }
}

function mapStateToProps(state){
	return{
		profileInfo: state.profileReducer,
        registerInfo: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        profileAction: ProfileAction
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);