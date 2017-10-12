import React from 'react'
import {registerChangeData, editComment, saveComment} from './actions'
import {connect} from 'react-redux'
import {comment} from "./reducers/index";

class CommentEdit extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const {saveComment, editComment, comment, post, user} = this.props
        if (comment.id) {
            editComment(comment)
        } else {
            const newComment = {...comment, parentId: post, author: user}
            saveComment(newComment)
        }
        // emptyAddComment()
    }

    onChange = (id, data) => {
        const {registerChangeData} = this.props
        registerChangeData(id, data)
    }

    render() {
        const {comment, onChange} = this.props
        return (
            <div className="card-body">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="commentBody">Comment</label>
                        <textarea id="commentBody" onChange={(e) => this.onChange(comment.id, {body:e.target.value})} value={comment.body} className="form-control"/>
                    </div>
                    <div className="form-group" >
                        <input className="form-control" placeholder={`Author Name`} value={comment.author} onChange={(e) => this.onChange(comment.id,{author:e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary">
                        {(comment.id) ? 'Edit Comment' : 'Add Comment'}
                    </button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    //({title, body, author, category})
    return {
        registerChangeData: (commentId, data) => dispatch(registerChangeData(commentId, data)),
        editComment: (comment) => dispatch(editComment(comment)),
        saveComment: (comment) => dispatch(saveComment(comment))
    }
}

const  mapStateToProps = ({comment, post}) => {
    const postEditData = (comment.currentComment) ? comment.comments[comment.currentComment] : comment.newComment
    return {comment:postEditData, post:post.currentPost}
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit)
