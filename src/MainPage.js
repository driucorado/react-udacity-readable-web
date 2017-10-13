import React, {Component} from 'react';
import MainLayout from './MainLayout'
import CategoryList from './Category/CategoryList'
import {getAllPosts, togglePostEdition} from './Post/actions'
import PostList from './Post/PostList'
import {Link} from 'react-router-dom'
import {backToCategory} from "./Post/actions/index";
import './style/css/Main/style/main.css'
import {connect} from 'react-redux'

class MainPage extends Component {

    componentDidMount() {
        const {getAllPosts, backToCategory} = this.props
        backToCategory()
        getAllPosts()
    }

    render() {
        const {user, posts, postList} = this.props
        return (
            <MainLayout title="Readable" currentUser={user} mainClass={`main_v01`} showTitle={true}>
                <div className="container-fluid">
                    <div className="form-group">
                        <Link to={`/posts/post/new`}>
                            <div className={`btn btn-primary`}>New Post</div>
                        </Link>
                    </div>
                    <CategoryList/>
                    <div>
                        <h3>Posts</h3>
                    </div>
                    <PostList
                        posts={posts}
                        list={postList}
                    />
                </div>
            </MainLayout>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
        togglePostEdition: (postId) => dispatch(togglePostEdition(postId)),
        backToCategory: () => dispatch(backToCategory(null))
    }
}

const mapStateToProps = ({user, post, main}) => {
    return {user: user.user, posts: post.posts, postList: post.list, openPostEdition: main.openPostEdition}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage) 