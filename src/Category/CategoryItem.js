import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class CategoryItem extends Component {
	render() {
		const {path, name} = this.props
		return (
			 	<div className="col-md-4 category-item">
			 		<h2>{name}</h2>
			 		<p><Link to={`/cat/${path}`} className="add-contact" >
			 			{name}
			 		</Link></p>
			 	</div>
		 	)
	}
}

export default CategoryItem