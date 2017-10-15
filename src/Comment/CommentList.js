import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    closeAddComment,
    deleteComment,
    editComment,
    emptyAddComment,
    ratingComment,
    saveComment,
    setCurrentComment
} from './actions'
import CommentEdit from './CommentEdit'

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}


class CommmentList extends Component {

    voteComment = (option, comment) => {
        const {voteComment} = this.props
        let voteScore = comment.voteScore
        if (option === VoteOption.UP) voteScore++;
        if (option === VoteOption.DOWN) voteScore--;
        const newComment = Object.assign(comment, {voteScore: voteScore})
        voteComment(option, newComment)
    }

    toggleEditComment = () => {
        const {openCommentEdition, setCurrentComment, closeAddComment} = this.props
        if (openCommentEdition) {
            closeAddComment()
        } else {
            setCurrentComment(null)

        }
    }


    render() {
        const {comments, deleteComment, setCurrentComment, commentList, openCommentEdition} = this.props
        return (<div className="post-comments">
            {openCommentEdition && (<CommentEdit/>)}
            <button type="button" onClick={this.toggleEditComment} className="btn btn-sm btn-primary">
                {(openCommentEdition) ? `Close` : `Add Comment`}
            </button>
            <ol className="list-group list-group-flush">
                {commentList.map((comment) => (
                    <li key={comments[comment].id} className="list-group-item">
                        <button type="button" onClick={(e) => deleteComment(comment, comments[comment].parentId)}
                                className="close"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <p>
                            <span
                                className={`badge badge-pill ${(comments[comment].voteScore > 0) ? 'badge-success' : 'badge-warning'} `}>
                                {comments[comment].voteScore}
                            </span>
                        </p>
                        <p>{new Date(comments[comment].timestamp).toLocaleString('en-US')}</p>

                        <p>{comments[comment].body}</p>
                        <footer className="blockquote-footer">{comment ? comments[comment].author : ''}</footer>

                        <div className="btn-group" role="group" aria-label={comments[comment].id}>
                            <button onClick={(e) => setCurrentComment(comment)} className="btn btn-sm">Edit
                            </button>
                            <button onClick={(e) => this.voteComment(VoteOption.UP, comments[comment])}
                                    className="btn btn-sm btn-success">Up
                            </button>
                            <button onClick={(e) => this.voteComment(VoteOption.DOWN, comments[comment])}
                                    className="btn btn-sm btn-warning">Down
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveComment: (comment) => dispatch(saveComment(comment)),
        emptyAddComment: () => dispatch(emptyAddComment()),
        deleteComment: (id, postId) => dispatch(deleteComment(id, postId)),
        editComment: (comment) => dispatch(editComment(comment)),
        setCurrentComment: (comment) => dispatch(setCurrentComment(comment)),
        voteComment: (option, comment) => dispatch(ratingComment(option, comment)),
        closeAddComment: () => dispatch(closeAddComment())
    }
}

const mapStateToProps = ({main, comment, post, user}) => {
    return {
        comments: comment.comments,
        commentList: comment.list,
        currentComment: comment.currentComment,
        post: post.posts[post.currentPost],
        openCommentEdition: comment.openCommentEdition,
        user: user.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommmentList)