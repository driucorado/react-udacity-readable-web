import React, {Component} from 'react'
import MainLayout from './MainLayout'
import CommentList from './Comment/CommentList'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {deletePost, getPost, ratingPost, togglePostEdition} from './Post/actions'
import {fetchCategories} from './Category/actions'
import {getCommentsByPost} from './Comment/actions'
import PostAdd from './Post/PostAdd'

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}

class PostPage extends Component {
    state = {title: '', posts: []}

    componentDidMount() {
        const {id} = this.props.match.params
        const {getPost, getComments, fetchCategories} = this.props
        fetchCategories()
        getPost(id)
        getComments(id)
    }

    votePost = (option, post) => {
        const {ratingPost} = this.props
        let voteScore = post.voteScore
        if (option === VoteOption.UP) voteScore++;
        if (option === VoteOption.DOWN) voteScore--;
        const newPost = Object.assign(post, {voteScore: voteScore})
        ratingPost(newPost, option)
    }

    deletePost = (post) => {
        const {deletePost} = this.props
        if (window.confirm(`Are you sure you want to delete this post "${post.title}" ?`)) {
            deletePost(post.id)
        }
    }

    render() {
        const {cat} = this.props.match.params
        const {post, user, togglePostEdition, openPostEdition} = this.props
        const divStyle = {
            border: 'solid'
        };

        return (
            <MainLayout mainClass="post_page_v01" currentUser={user} title={
                <span>
					<Link
                        to={`/${post.id ? post.category : cat}`}>{post.id ? post.category : cat}</Link>/{post.id ? post.title : ''}
				</span>
            }>
                {(post.id) && (
                    <div className="btn-group" role="group">
                        <button type="button" onClick={() => togglePostEdition(post.id)}
                                className="btn btn-sm btn-primary">
                            Edit Post
                        </button>
                        <button type="button" onClick={() => this.votePost(VoteOption.UP, post)}
                                className="btn btn-sm btn-success">Vote Up
                        </button>
                        <button type="button" onClick={() => this.votePost(VoteOption.DOWN, post)}
                                className="btn btn-sm btn-warning">Vote Down
                        </button>
                        <button type="button" onClick={() => this.deletePost(post)}
                                className="btn btn-sm btn-danger">Delete Post
                        </button>
                    </div>
                )}
                <div>
                    {openPostEdition && (<PostAdd isPostPage={true}/>)}
                </div>
                <div className={`card post-header ${post.id ? '' : 'text-white bg-danger' } `} style={divStyle}>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">

                            <p>{post.id ? post.body : '--DELETED / NOT FOUND--'}</p>
                            <footer className="blockquote-footer">{post ? post.author : ''}</footer>
                        </blockquote>
                        <br/>
                        <div>created at {new Date(post.timestamp).toLocaleString('en-US')}</div>
                        <div>total comments <span className="badge badge-dark">{post.commentCount}</span></div>
                        <div>total score <span className="badge badge-info">{post.voteScore}</span></div>
                    </div>
                </div>
                {(post.id) && (
                    <CommentList/>
                )}
            </MainLayout>)
    }

}


function mapDispatchToProps(dispatch) {
    return {
        getPost: (data) => dispatch(getPost(data)),
        getComments: (data) => dispatch(getCommentsByPost(data)),
        fetchCategories: () => dispatch(fetchCategories()),
        togglePostEdition: (postId) => dispatch(togglePostEdition(postId)),
        ratingPost: (postId, option) => dispatch(ratingPost(postId, option)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

const mapStateToProps = ({main, post, user}) => {
    const postData = post.posts[post.currentPost]
    return {
        post: postData ? postData : {},
        openPostEdition: post.openPostEdition,
        user: user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)