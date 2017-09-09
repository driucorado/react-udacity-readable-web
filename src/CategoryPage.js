import React, { Component } from 'react'
import MainLayout from './MainLayout'
// import {fetchPosts} from './Post/actions'
import PostItem from './Post/PostItem'
import {connect} from 'react-redux'

import PostList from './Post/PostList'

import PropTypes from 'prop-types'
import {fetchWikiInfo} from './Category/actions'


class CategoryPage extends Component {
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
				<PostList cat={title}/>
			</MainLayout>)
	}


}


function mapDispatchToProps(dispatch) {
	return {
		//fetchWikiInfo: (data) => dispatch(fetchWikiInfo(data))
	}
}

const  mapStateToProps = ({main}) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)