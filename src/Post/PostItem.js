import React, { Component } from 'react';

class PostItem extends Component {
	//state = {title: '', content: ''}
	render() {
		const {title, content} =  this.props
		return (<div className="post-item">
					<div className="post-header">{title}</div>
					<div className="post-content">{content}</div>
			    </div>)
	}
}

export default PostItem;
