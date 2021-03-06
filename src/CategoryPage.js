import React, {Component} from 'react'
import MainLayout from './MainLayout'
import {emptyCurrentPost, fetchPosts} from './Post/actions'
import {backToCategory} from "./Post/actions/index";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCategories} from './Category/actions'
import PostList from './Post/PostList'


class CategoryPage extends Component {
    componentDidMount() {
        const {cat} = this.props.match.params;
        const {fetchCategories, backToCategory} = this.props;
        fetchCategories();
        backToCategory();
        this.props.fetchPosts(cat);
        this.props.emptyCurrentPost()

    }

    render() {
        const {posts, title, user, postList, openPostEdition, categories} = this.props;
        const existCat = (!!categories[title])
        console.log(existCat)
        return (
            <MainLayout currentUser={user} mainClass={`category_v01`} title={
                <span><Link to={`/`}>Readable</Link>/{title}</span>
            }>
                <h1>{existCat ? title : `Category "${title}" Not Found`}</h1>
                {(existCat) && (
                    <PostList
                        posts={posts}
                        list={postList}
                        openPostEdition={openPostEdition}
                    />)}
            </MainLayout>)
    }

}


function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (category) => dispatch(fetchPosts(category)),
        emptyCurrentPost: () => dispatch(emptyCurrentPost()),
        fetchCategories: () => dispatch(fetchCategories()),
        backToCategory: () => dispatch(backToCategory(null))
    }
}

const mapStateToProps = ({post, main, category, user}) => {
    return {
        posts: post.posts,
        title: category.selectedCategory,
        user: user.user,
        categories: category.categories,
        currentPost: post.currentPost,
        postList: post.list,
        openPostEdition: main.openPostEdition
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)