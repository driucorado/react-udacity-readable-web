import React, { Component } from 'react'
import MainLayout from './MainLayout'
import CommentList from  './Comment/CommentList'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {getPost, togglePostEdition} from './Post/actions'
import {fetchCategories} from './Category/actions'
import {getCommentsByPost} from './Comment/actions'
import PostAdd from './Post/PostAdd'

class PostPage extends Component {
	state =  {title: '', posts: []}
	componentDidMount() {
		const {id, cat} = this.props.match.params
		const {getPost, getComments, fetchCategories} = this.props
        fetchCategories()
		getPost(id)
		getComments(id)
	}

	render() {
        const {id, cat} = this.props.match.params
		const {post, user, togglePostEdition, openPostEdition} = this.props
		return (
			<MainLayout mainClass="post_page_v01" currentUser={user} title={
				<span>
					<Link to={`/${post.id ? post.category : cat}`}>{post.id ? post.category : cat}</Link>/{post.id ? post.title :  ''}
				</span>
			}>
				<div>
					<button type="button" onClick={() => togglePostEdition(post.id)} className="btn btn-sm btn-primary">Edit Post</button>
				</div>
				<div>
                    {openPostEdition && (<PostAdd isPostPage={true} />)}
				</div>
				<div className={`card post-header ${post.id ? '' : 'text-white bg-danger' } `}>
				  <div className="card-body">
				    <blockquote className="blockquote mb-0">
				      <p>{post.id ? post.body : '--DELETED--'}</p>
				      <footer className="blockquote-footer">{post ? post.author : ''}</footer>
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
		getComments: (data) => dispatch(getCommentsByPost(data)),
        fetchCategories: () => dispatch(fetchCategories()),
        togglePostEdition: (postId) => dispatch(togglePostEdition(postId))
	}
}

const  mapStateToProps = ({main, post, user}) => {
    const postData = post.posts[post.currentPost]
	return {
		post:postData ? postData : {},
        openPostEdition: post.openPostEdition,
		user: user.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)