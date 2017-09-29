import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import MainLayout from './MainLayout'
import {connect} from 'react-redux'
import {registerUser} from './Login/actions'
import './style/css/Login/style/login.css';


class LoginPage extends Component {
  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
  	const {registerUser, user} = this.props
  	if (user != null) {
  		return (<Redirect to="/" />)
  	} else
  	return (
  		<MainLayout title="Readable" mainClass="login_v01" showTitle={true}>
  		<div className="container">
  			<div className="row" >
  				<div className="col-4">
  				</div>
  				<div className="col-4">
	  		<form className="form-signin" onSubmit={this.handleSubmit}>
	  		  {/*<div className="form-group">
	  		  	 <label htmlFor="userName">UserName</label>
	   			 <input className="form-control" name="userName" placeholder="Enter UserName" />
	          </div>*/}
	          <button type="submit" onClick={() => { registerUser("User")
	      		}} className="btn btn-primary">Enter to Readable</button>
	        </form>
	        	</div>
	        </div>
        </div>
  		</MainLayout>)
  }
}

function mapDispatchToProps(dispatch) {
	return {
		registerUser: (userName) => dispatch(registerUser(userName))
	}
}

const  mapStateToProps = ({user}) => {
	return {user: user.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)