import React, { Component } from 'react';
import MainLayout from './MainLayout'
import CategoryList from './Category/CategoryList'
import {getAllPosts} from './Post/actions'
import PostList from './Post/PostList'
import './style/css/Main/style/main.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

/**
 Default (Root)
 should list all available categories, which should link to a category view for that category
 should list all of the posts ordered by voteScore (highest score first)
 should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
 should have a control for adding a new post
 */
class MainPage extends Component {
	componentDidMount() {
		const {getAllPosts} = this.props
		getAllPosts()
	}
	render() {
		const {user, posts} = this.props
		return (
			<MainLayout title="Readable" currentUser={user} mainClass={`main_v01`} showTitle={true}>
			<div className="container-fluid">
				<CategoryList  />
				<div>
					<h3>Posts</h3>
				</div>
				<PostList posts={posts}/>
			</div>
			</MainLayout>)
	}
}

function mapDispatchToProps(dispatch) {
	return {getAllPosts: () => dispatch(getAllPosts())}
}

const  mapStateToProps = ({user, category}) => {
	return {user: user.user, posts: category.posts}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage) 