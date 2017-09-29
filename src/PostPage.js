import React, { Component } from 'react'
import MainLayout from './MainLayout'
import CommentList from  './Comment/CommentList'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {getPost, getCommentsByPost} from './Post/actions'


class PostPage extends Component {
	state =  {title: '', posts: []}
	componentDidMount() {
		const {id} = this.props.match.params
		const {getPost, getComments} = this.props
		getPost(id)
		getComments(id)
	}

	render() {
		const {post, comments} = this.props
		return (
			<MainLayout mainClass="post_page_v01" title={'Post'}>
				<div className="card post-header">
				  <div className="card-header">
				    {post.title} <Link to={`/post/${post.id}/edit`}>Edit</Link>
				  </div>
				  <div className="card-body">
				    <blockquote className="blockquote mb-0">
				      <p>{post.body}</p>
				      <footer className="blockquote-footer">{post.author}</footer>
				    </blockquote>
				  </div>
				</div>
				<CommentList />
			</MainLayout>)
	}

}


function mapDispatchToProps(dispatch) {
	return {
		getPost: (data) => dispatch(getPost(data)),
		getComments: (data) => dispatch(getCommentsByPost(data))
	}
}

const  mapStateToProps = ({main, post}) => {
	return {
		post:post.post,
		comments: post.comments
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)