import React, { Component } from 'react'
import MainLayout from './MainLayout'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPost} from './Post/actions'


class PostPage extends Component {
	state =  {title: '', posts: []}
	componentDidMount() {
		const {cat} = this.props.match.params
		// this.props.fetchWikiInfo(cat)
		this.setState({
			title:cat
		})
	}

	render() {
		const {title, posts} = this.state
		return (
			<MainLayout title={title}>
				jojo
			</MainLayout>)
	}


}


function mapDispatchToProps(dispatch) {
	return {
		createPost: (data) => dispatch(createPost(data))
	}
}

const  mapStateToProps = ({main, post}) => {
	return {post:post.data}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)