import React, { Component } from 'react';

class Header extends Component {
	state = {title: ''}

	componentDidMount() {
		const {title} = this.props
		this.setState({title:title})
	}

	render() {
		const {title} = this.props
		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					<a className="navbar-brand" href="#">{title}</a>
				</nav>
			</div>)
	}
}

export default Header