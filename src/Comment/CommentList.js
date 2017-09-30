import React, { Component } from 'react'
import {connect} from 'react-redux'
import {saveComment, changeBody, deleteComment, emptyAddComment, editComment, ratingComment, setCurrentComment} from './actions'

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}


class CommmentList extends Component {


	handleSubmit = (e) => {
		e.preventDefault();
		const {saveComment, emptyAddComment, comment, post, user} = this.props
		const newComment = {...comment, parentId: post.id, author: user}
		if (comment.id) {
			editComment(comment)
		} else {
			saveComment(newComment)			
		}
		emptyAddComment()
	}

	voteComment = (option, comment) => {
		const {voteComment} = this.props
		let voteScore = comment.voteScore
		if (option === VoteOption.UP) voteScore++;
		if (option === VoteOption.DOWN) voteScore--;
		const newComment = Object.assign(comment, {voteScore: voteScore})
		voteComment(option, newComment)
	}

	
	render() {
		const {comments, comment, changeBody, deleteComment, setCurrentComment} = this.props
		return (<div className="post-comments">
					<div className="card bg-light mb-3">
					  <div className="card-header">
					  	Comments
					  </div>
					  <div className="card-body">
					  	<form onSubmit={(e) => this.handleSubmit(e)}>
						  <div className="form-group">
						  	<label htmlFor="commentBody">Comment</label>
						  	<textarea id="commentBody" onChange={(e) => changeBody(e.target.value)} value={comment.body} className="form-control"></textarea>
						  </div>
						  <button type="submit" className="btn btn-sm btn-primary">
						  	{(comment.id) ? 'Edit Comment' : 'Add Comment'} 
						  </button>
						</form>
					  </div>
					</div>
					<ol className="list-group list-group-flush">
			     	{comments.map(comment => (
						<li key={comment.id} className="list-group-item">
							<button type="button" onClick={(e) => deleteComment(comment.id)} className="close" aria-label="Close">
				          		<span aria-hidden="true">&times;</span>
				        	</button>
							<p>{comment.body}</p>
							<div className="btn-group" role="group" aria-label={comment.id}>
								<button onClick={(e) => setCurrentComment(comment)} className="btn">Edit</button>
								<button onClick={(e) => this.voteComment(VoteOption.UP, comment)} className="btn btn-success">Up</button>
								<button onClick={(e) => this.voteComment(VoteOption.DOWN, comment)} className="btn btn-warning">Down</button>
							</div>
						</li>
			     	))}
					</ol>
				</div>)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeBody: (body) => dispatch(changeBody(body)),
		saveComment: (comment) => dispatch(saveComment(comment)),
		emptyAddComment: () => dispatch(emptyAddComment()),
		deleteComment: (id) => dispatch(deleteComment(id)),
		editComment: (comment) => dispatch(editComment(comment)),
		setCurrentComment: (comment) => dispatch(setCurrentComment(comment)),
		voteComment: (option, comment) => dispatch(ratingComment(option, comment))
	}
}

const  mapStateToProps = ({main, comment, post, user}) => {
	return {
		comment: comment.comment,
		comments: post.comments,
		post: post.post,
		user: user.user
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CommmentList)