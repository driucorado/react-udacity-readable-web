import React, { Component } from 'react';
import MainLayout from '../MainLayout'
import {prepareAddPost, createPost, editPost, getPost, changeBody, changeTitle, backToCategory} from './actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class PostAdd extends Component {
	componentDidMount() {
		const {id,cat} = this.props.match.params
		const {prepareAddPost, getPost}  = this.props 
		if (id)  getPost(id)
		if (cat) prepareAddPost(cat)
	} 

	handleSubmit = (e) => {
		e.preventDefault();
		const {editPost, addPost, backToCategory, post, user} = this.props
		const {id} = post
		if (id) editPost(post)
		else {
			const newPost = {...post, user:user}
			addPost(newPost)
			//change state to return
		}
        backToCategory(post.category)
	}

	render() {
		const {post, redirectToCategory, changeTitle, changeBody} = this.props
		const postTitle = (post.id) ? `${post.title}` : `New Post for ${post.category} category`
		const saveButtonTitle =  (post.id) ? `Save Changes` : `Save Post`
		const urlRedirect =  (post.id) ? `/post/${post.id}` : `/cat/${post.category}`
		return ((redirectToCategory) ? <Redirect to={urlRedirect}/> :  <MainLayout mainClass={`post_add_v01`} title={postTitle}>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group" >
						<input className="form-control" value={post.title} onChange={(e) => changeTitle(e.target.value) } />
					</div>
					<div className="form-group" >
						<textarea className="form-control" value={post.body} onChange={(e) => changeBody(e.target.value)} >
						</textarea>
					</div>
					<div className="form-group" >
						<input className="btn btn-primary" type="submit" value={saveButtonTitle} />
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
		changeTitle: (title) => dispatch(changeTitle(title)),
        backToCategory: (category) => dispatch(backToCategory(category))
	}
}

const  mapStateToProps = ({post, user}) => {
	return {post: post.post, user: user.user, redirectToCategory: post.redirectToCategory}
}
	

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd)