import React, { Component } from 'react';
import MainLayout from './MainLayout'
import CategoryList from './Category/CategoryList'
import './style/css/Main/style/main.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

class MainPage extends Component {
	render() {
		const {user} = this.props
		return (<MainLayout title="Readable" currentUser={user} mainClass={`main_v01`} showTitle={true}>
			<div className="container-fluid">
				<CategoryList  />
			</div>
			</MainLayout>)
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

const  mapStateToProps = ({user}) => {
	return {user: user.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage) 