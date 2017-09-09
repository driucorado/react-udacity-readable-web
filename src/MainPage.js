import React, { Component } from 'react';
import MainLayout from './MainLayout'
import Header from './Header'
import {Link} from 'react-router-dom'
import CategoryList from './Category/CategoryList'

class MainPage extends Component {
	render() {
		const {onSelectCategory} = this.props
		return (
			<MainLayout title="Readable" showTitle={true}>
			<div className="container-fluid">
				<div className="row">
				<CategoryList onSelectCategory={onSelectCategory}  />
				</div>
			</div>
			</MainLayout>
			)
	}
}

export default MainPage