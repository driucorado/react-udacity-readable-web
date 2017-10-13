import React, {Component} from 'react'
import {deletePost, orderPostsByTime, orderPostsByVote, ratingPost, togglePostEdition} from './actions'
import {connect} from 'react-redux'
import PostItem from './PostItem'
import PostAdd from './PostAdd'


const OrderOption = {
    TimeStamp: 'TimeStamp',
    Score: 'Score'
}

const VoteOption = {
    UP: 'upVote',
    DOWN: 'downVote'
}


class PostList extends Component {

    orderBy = (option) => {
        const {orderPostsByVote, orderPostsByTime} = this.props
        if (option === OrderOption.Score) orderPostsByVote()
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
        const {posts, deletePost, list, openPostEdition, togglePostEdition, currentPost} = this.props
        return (
            <div className="post-list">
                <div>
                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <input type="button" onClick={(e) => togglePostEdition()} title="Create New Post"
                                   className="btn btn-primary" value="Add Post"/>
                            <input type="button" onClick={(e) => this.orderBy(OrderOption.TimeStamp)}
                                   title="Order By Date" className="btn btn-success" value="Order By Date"/>
                            <input type="button" onClick={(e) => this.orderBy(OrderOption.Score)} title="Order By Date"
                                   className="btn btn-success" value="Order By Score"/>
                        </div>
                    </div>
                </div>
                <div>
                    {openPostEdition && (<PostAdd/>)}
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Score</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Body</th>
                            <th># comments</th>
                            <th>Author</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((post) => (
                            <PostItem
                                key={post}
                                currentPost={currentPost}
                                voteOptions={VoteOption}
                                post={posts[post]}
                                togglePostEdition={togglePostEdition}
                                votePost={this.votePost}
                                deletePost={deletePost}/>
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
        orderPostsByTime: () => dispatch(orderPostsByTime()),
        togglePostEdition: () => dispatch(togglePostEdition())
    }
}

//
const mapStateToProps = ({post}) => {
    return {openPostEdition: post.openPostEdition}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)