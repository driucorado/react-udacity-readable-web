import React, { Component } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

class MainLayout extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		title: PropTypes.string.isRequired,
		mainClass: PropTypes.string.isRequired
	}

	render() {
		const {title, children, mainClass, currentUser} = this.props
		return (<div className={`${mainClass} main`}> 
					<Header title={title} user={currentUser}/>
					<div>{children}</div>
				</div>)
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

const  mapStateToProps = ({user}) => {
	return {user: user.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout) 