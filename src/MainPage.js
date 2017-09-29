import React, { Component } from 'react';
import MainLayout from './MainLayout'
import CategoryList from './Category/CategoryList'
import './style/css/Main/style/main.css'

class MainPage extends Component {
	render() {
		console.log(this.props)
		const {onSelectCategory} = this.props
		return (
			<MainLayout title="Readable" mainClass={`main_v01`} showTitle={true}>
			<div className="container-fluid">
				<CategoryList  />
			</div>
			</MainLayout>
			)
	}
}

export default MainPage