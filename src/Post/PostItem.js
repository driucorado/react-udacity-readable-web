import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCommentsByPost} from "../Comment/actions/index";

import {togglePostEdition} from './actions'

class PostItem extends Component {
    componentDidMount() {
        const {post, getCommentsByPost} = this.props
        if (!post.deleted) getCommentsByPost(post.id)
    }

    deletePost = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const {deletePost} = this.props
            deletePost(id)
        }
    }

    editPost = (id) => {
        console.log(id)
        const {togglePostEdition} = this.props
        togglePostEdition(id)
    }

    render() {
        const {post, votePost, voteOptions, currentPost} = this.props
        return (<tr className={post.deleted ? `table-danger` : (post.id === currentPost) ? `is_editing` : ``}>
            <td>{post.voteScore}</td>
            <td><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></td>
            <td>{new Date(post.timestamp).toLocaleString('en-US')}</td>
            <td>{post.body}</td>
            <td>{post.commentCount !== null && post.commentCount > -1 ? post.commentCount : 'loading...'}</td>
            <td>{post.author}</td>
            <td>
                {post.deleted ? (
                    <div><span className="badge badge-danger">DELETED</span></div>
                ) : (
                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <input type="button" onClick={(e) => votePost(voteOptions.UP, post)} title="Vote UP"
                                   className="btn btn-success" value="up"/>
                            <input type="button" onClick={(e) => votePost(voteOptions.DOWN, post)} title="Vote Down"
                                   className="btn btn-warning" value="down"/>
                            <input type="button" onClick={(e) => this.editPost(post.id)} title="Edit Post"
                                   className="btn btn-primary" value="Edit"/>
                            <input type="button" onClick={(e) => this.deletePost(post.id)} title="Delete"
                                   className="btn btn-danger" value={`X`}/>
                        </div>
                    </div>)}
            </td>
        </tr>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCommentsByPost: (postId) => dispatch(getCommentsByPost(postId)),
        togglePostEdition: (postId) => dispatch(togglePostEdition(postId))
    }
}

const mapStateToProps = ({post}) => {
    return {currentPost: post.currentPost}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostItem)