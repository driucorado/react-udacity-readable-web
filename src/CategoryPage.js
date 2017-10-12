import React, {Component} from 'react'
import MainLayout from './MainLayout'
import {fetchPosts, emptyCurrentPost} from './Post/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCategories} from './Category/actions'
import PostList from './Post/PostList'


class CategoryPage extends Component {
    componentDidMount() {
        const {cat} = this.props.match.params
        const {fetchCategories} = this.props
        fetchCategories()
        this.props.fetchPosts(cat)
        this.props.emptyCurrentPost()
    }

    render() {
        const {posts, title, user, postList, openPostEdition} = this.props
        return (
            <MainLayout currentUser={user} mainClass={`category_v01`} title={
                <span><Link to={`/`}>Readable</Link>/{title}</span>
            }>
                <PostList
                    posts={posts}
                    list={postList}
                    openPostEdition={openPostEdition}
                />
            </MainLayout>)
    }

}


function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (category) => dispatch(fetchPosts(category)),
        emptyCurrentPost: () => dispatch(emptyCurrentPost()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

const mapStateToProps = ({post, main, category, user}) => {
    return {
        posts: post.posts,
        title: category.selectedCategory,
        user: user.user,
        currentPost: post.currentPost,
        postList: post.list,
        openPostEdition: main.openPostEdition
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)