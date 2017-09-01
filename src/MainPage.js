import React, { Component } from 'react';
import * as CategoryApi from './api/CategoryApi'
import MainLayout from './MainLayout'

class MainPage extends Component {
	state = {categories:[]}
	componentDidMount() {
		CategoryApi.getAll().then((categories) => {
			this.setState({categories:categories})
		})
	}

	render() {
		const {categories} = this.state;
		return (
			<MainLayout>
			<div className="container-fluid">
				<div className="row">
				 {categories.map((category) => (
				 	<div className="col">
				 		{category.name}
				 	</div>
				 ))}
				</div>
			</div>
			</MainLayout>
			)
	}
}

export default MainPage