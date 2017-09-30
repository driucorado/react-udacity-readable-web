import React, { Component } from 'react';
import MainLayout from '../MainLayout'
import {prepareAddPost, createPost, editPost, getPost, changeBody, changeTitle} from './actions'
import {connect} from 'react-redux'

const TITLE_INPUT = "TITLE_INPUT"
const BODY_INPUT = "BODY_INPUT"

class PostAdd extends Component {
	componentDidMount() {
		const {id,cat} = this.props.match.params
		const {prepareAddPost, getPost}  = this.props 
		if (id)  getPost(id)
		if (cat) prepareAddPost(cat)
	} 

	handleSubmit = (e) => {
		e.preventDefault();
		const {editPost, addPost, post, user} = this.props
		const {id} = post
		if (id) editPost(post)
		else {
			const newPost = {...post, user:user}
			addPost(newPost)
		}
	}

	handleInputChange = (e, input) => {
		const value = e.target.value
		const {changeTitle, changeBody} = this.props
		 switch (input) {
		 	case BODY_INPUT:
		 		changeBody(value)
		 		break
		 	case TITLE_INPUT:
		 		changeTitle(value)
		 		break
		 	default:
		 		//nothing
		 }
	}

	render() {
		const {post} = this.props
		const postTitle = (post.id) ? `${post.title}` : `New Post for ${post.category} category`
		return (<MainLayout mainClass={`post_add_v01`} title={postTitle}>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group" >
						<input className="form-control" value={post.title} onChange={(e) => this.handleInputChange(e, TITLE_INPUT)} placeholder="Title" />
					</div>
					<div className="form-group" >
						<textarea className="form-control" value={post.body} onChange={(e) => this.handleInputChange(e, BODY_INPUT)} >
						</textarea>
					</div>
					<div className="form-group" >
						<input className="btn btn-primary" type="submit" value="Save Post" />
					</div>
				</form>
			</MainLayout>)
	}
}

const mapDispatchToProps = (dispatch) => {
	//({title, body, author, category})
	return {
		prepareAddPost: (cat) => dispatch(prepareAddPost(cat)),
		addPost: (postData) => dispatch(createPost(postData)),
		getPost: (id) => dispatch(getPost(id)),
		editPost: (post) => dispatch(editPost(post)),
		changeBody: (body) => dispatch(changeBody(body)),
		changeTitle: (title) => dispatch(changeTitle(title))
	}
}

const  mapStateToProps = ({post, user}) => {
	return {category: "", post: post.post, user: user.user}
}
	

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd)