import React, { Component } from 'react'
import {ratingPost, deletePost} from '../Category/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}

class PostList extends Component {

	votePost = (option, post) => {
		const {ratingPost} = this.props
		let voteScore = post.voteScore
		if (option === VoteOption.UP) voteScore++;
		if (option === VoteOption.DOWN) voteScore--;
		const newPost = Object.assign(post, {voteScore: voteScore})
		ratingPost(newPost, option)
	}


	render() {
		const {posts, deletePost} = this.props
		return(<div className="post-list">
					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
				                <tr>
				                  <th>Score</th>
				                  <th>Title</th>
				                  <th>Body</th>
				                  <th>Options</th>
				                </tr>
				             </thead>
				             <tbody>
				             {posts.map((post) => (
								<tr key={post.id}>
								  <td>{post.voteScore}</td>
				                  <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
				                  <td>{post.body}</td>
				                  <td>

				                  	<div className="form-group">
				                  	<div className="btn-group" role="group" aria-label="Basic example">
					                  	<input type="button" onClick={(e) => this.votePost(VoteOption.UP, post)} title="Vote UP" className="btn btn-success" value="up"/>
					                  	<input type="button" onClick={(e) => this.votePost(VoteOption.DOWN, post)} title="Vote Down"  className="btn btn-warning" value="down"/>
					                  	<input type="button" onClick={(e) => deletePost(post.id)} title="Delete" className="btn btn-danger" value={`X`} />
				                  	</div>
				                  	</div>
				                  </td>
				                </tr>
							))} 
				              </tbody>
						</table>
					</div>
			    </div>)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		ratingPost: (postId, option) => dispatch(ratingPost(postId, option)),
		deletePost: (postId) => dispatch(deletePost(postId))
	}
}

const  mapStateToProps = ({user, category}) => {
	return {user: user.user, posts: category.posts}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList) 