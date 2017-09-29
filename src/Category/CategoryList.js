import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchCategories} from './actions'
import CategoryItem from './CategoryItem'

class CategoryList extends Component {

	componentDidMount() {
		this.props.fetchCategories()
	}

	render() {
		const {categories} = this.props;
		return (
			<div className="row category-list">
			{categories.map((category) => (
				 	<CategoryItem 
				 	key={category.path} 
				 	path={category.path} 
				 	name={category.name} />
			))}
			</div>)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		fetchCategories: (data) => dispatch(fetchCategories())
	}
}

const  mapStateToProps = ({main}) => {
	return {categories : main.categories}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

