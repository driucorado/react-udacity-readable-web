import React, {Component} from 'react'
import MainLayout from './MainLayout'
import {fetchPosts,} from './Category/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostList from './Post/PostList'


class CategoryPage extends Component {
    componentDidMount() {
        const {cat} = this.props.match.params
        this.props.fetchPosts(cat)
    }

    render() {
        const {posts, title, user} = this.props
        return (
            <MainLayout currentUser={user} mainClass={`category_v01`} title={
                <span><Link to={`/`}>Readable</Link>/{title}</span>
            }>
                <PostList/>
                <Link to={`/cat/${title}/posts`}>Add</Link>
            </MainLayout>)
    }

}


function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (category) => dispatch(fetchPosts(category))
    }
}

const mapStateToProps = ({category, user}) => {
    return {
        posts: category.posts,
        title: category.title,
        user: user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)