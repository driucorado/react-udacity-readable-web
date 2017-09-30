import React, { Component } from 'react';

class Header extends Component {

	render() {
		const {title, user} = this.props
		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					<div className="navbar-brand" >{title}</div>
					<ul className="navbar-nav mr-auto">
			          <li className="nav-item active">
			            <div className="nav-link" >@{user}</div>
			          </li>
			        </ul>
				</nav>
			</div>)
	}
}

export default Header