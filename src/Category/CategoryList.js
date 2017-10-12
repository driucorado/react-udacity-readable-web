import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchCategories} from './actions'
import CategoryItem from './CategoryItem'
import {category} from "./reducers/index";

class CategoryList extends Component {

	componentDidMount() {
		this.props.fetchCategories()
	}

	render() {
		const {categories, list} = this.props;
		return (
			<div className="row category-list">
				{list.map((category) => (
					<CategoryItem
						key={categories[category].path}
						path={categories[category].path}
						name={categories[category].name} />
				))}
			</div>)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		fetchCategories: (data) => dispatch(fetchCategories())
	}
}

const  mapStateToProps = ({category}) => {
	return {categories : category.categories, list: category.categoryList}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

