import React, { Component } from 'react'
import {orderPostsByVote, orderPostsByTime, ratingPost, deletePost} from './actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}

const OrderOption = {
    TimeStamp: 'TimeStamp',
    Score: 'Score'
}

class PostList extends Component {
	componentDidMount() {
		console.log(this.props)
	}
	orderBy = (option) => {
		const {orderPostsByVote, orderPostsByTime} = this.props
		if (option === OrderOption.Score)  orderPostsByVote()
		if (option === OrderOption.TimeStamp) orderPostsByTime()
		//Order By event
	}

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
					<div>
						<div className="form-group" >
							<div className="btn-group" role="group" aria-label="Basic example">
								<input type="button" onClick={(e) => this.orderBy(OrderOption.TimeStamp)} title="Order By Date" className="btn btn-success" value="Order By Date"/>
								<input type="button" onClick={(e) => this.orderBy(OrderOption.Score)} title="Order By Date" className="btn btn-success" value="Order By Score"/>
							</div>
						</div>
					</div>
					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
				                <tr>
				                  <th>Score</th>
				                  <th>Title</th>
								  <th>Date</th>
				                  <th>Body</th>
				                  <th>Options</th>
				                </tr>
				             </thead>
				             <tbody>
				             {posts.map((post) => (
								<tr key={post.id}>
								  <td>{post.voteScore}</td>
				                  <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
								  <td>{new Date(post.timestamp).toLocaleString('en-US')}</td>
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
		deletePost: (postId) => dispatch(deletePost(postId)),
        orderPostsByVote: () => dispatch(orderPostsByVote()),
        orderPostsByTime: () => dispatch(orderPostsByTime())
	}
}

export default connect(null, mapDispatchToProps)(PostList)