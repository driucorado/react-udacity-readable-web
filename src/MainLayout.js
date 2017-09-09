import React, { Component } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import './style/css/index.css'
import './style/css/category.css'

class MainLayout extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		title: PropTypes.string.isRequired,
		showTitle: PropTypes.bool
	}

	render() {
		const {title, children, showTitle} = this.props
		return (<div className="main readable_v01 category_v01"> 
					<Header title={title}/>
					{showTitle && ( 
				    <div className="jumbotron">
				      <div className="container">
				        <h1 className="display-3">Hello, world!</h1>
				        <p>Please select a Category</p>
				        <Link to={`/cat/${title}/post/create`}>
				        <button type="button" className="btn btn-secondary btn-lg">Create Post</button>
				        </Link>
				      </div>
				    </div>
				    )}
				<div>
					{children}
				</div>
				</div>)
		}
}

export default MainLayout