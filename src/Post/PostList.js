import React, { Component } from 'react'
import PostItem from './PostItem'

import {fetchPosts} from './actions'

import {connect} from 'react-redux'

class PostList extends Component {
	state =  {posts: []}

	componentDidMount() {
		const {cat} = this.props.cat
		this.props.fetchPosts(cat)
	}

	render() {
		const {posts} = this.props
		return(<div className="post-list">
					<ul>
					{posts.map((post) => (
						<li key={post.id}>
							<PostItem title={post.title} content={post.body}/>
						</li>
					))}
					</ul>
			    </div>)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		fetchPosts:  (data) => dispatch(fetchPosts(data))
	}
}

function  mapStateToProps({category}) {
	return {
		posts: category.posts
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)