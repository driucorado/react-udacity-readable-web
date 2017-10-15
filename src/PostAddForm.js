import React, {Component} from 'react';
import {
    backToCategory,
    createPost,
    editPost,
    getPost,
    registerChangeData,
    savePost,
    togglePostEdition,
    closePostEdition
} from './Post/actions/index'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import MainLayout from "./MainLayout";
import {fetchCategories} from './Category/actions'

class PostAddForm extends Component {
    componentDidMount() {
        const {id} = this.props.match.params
        const {getPost, fetchCategories} = this.props
        fetchCategories().then((id && (getPost(id))))
    }

    handleSubmit = (e) => {
        const {createPost, editPost, post, backToCategory, closePostEdition} = this.props
        e.preventDefault();

        if (post.id) {
            editPost(post)
            //togglePostEdition(isPostPage ? post.id : null)
            backToCategory(post.category)
        } else {
            createPost(post)
            //togglePostEdition(null)
            backToCategory(post.category)
        }
        closePostEdition()

    }

    onChange = (id, data) => {
        const {registerChangeData} = this.props
        registerChangeData(id, data)
    }

    render() {
        const {post, categories, categoryList, selectedCategory, backTo} = this.props
        const saveButtonTitle = (post.id) ? `Save Changes` : `Create Post`
        const showCategoriesList = categoryList.length === 0 ? (selectedCategory) ? [selectedCategory] : [] : categoryList
        console.log(post)
        return ( (backTo) ? <Redirect to={`/${backTo}`}/> :
            <MainLayout mainClass="post_page_v01" currentUser={''} title={
                <span>
					<Link to={`/`}>Readable</Link>/{post.id ? post.title : 'new post'}
				</span>
            }>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">Title</label>
                            <input className="form-control" value={post.title} placeholder={`Title`}
                                   onChange={(e) => this.onChange(post.id, {title: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">Body</label>
                            <textarea className="form-control" value={post.body} placeholder={`Post Body`}
                                      onChange={(e) => this.onChange(post.id, {body: e.target.value})}>
                    </textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">Category</label>
                            <select
                                value={post.category}
                                onChange={(e) => this.onChange(post.id, {category: e.target.value})}
                                className="form-control"
                            >
                                {(showCategoriesList.length > 0) && showCategoriesList.map((category) =>
                                    <option key={categories[category].path}
                                            value={categories[category].path}>{categories[category].name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">Author</label>
                            <input className="form-control" placeholder={`Author Name`} value={post.author}
                                   onChange={(e) => this.onChange(post.id, {author: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <input className="btn btn-primary" type="submit" value={saveButtonTitle}/>
                        </div>
                    </form>
                </div>
            </MainLayout>)
    }
}

const mapDispatchToProps = (dispatch) => {
    //({title, body, author, category})
    return {
        getPost: (id) => dispatch(getPost(id)),
        savePost: (postId) => dispatch(savePost(postId)),
        editPost: (post) => dispatch(editPost(post)),
        createPost: (post) => dispatch(createPost(post)),
        togglePostEdition: (postId) => dispatch(togglePostEdition(postId)),
        registerChangeData: (postId, data) => dispatch(registerChangeData(postId, data)),
        fetchCategories: () => dispatch(fetchCategories()),
        backToCategory: (category) => dispatch(backToCategory(category)),
        closePostEdition: () => dispatch(closePostEdition())
    }
}

const mapStateToProps = ({post, category}) => {
    const postEditData = (post.currentPost) ? post.posts[post.currentPost] : post.newPost
    return {
        post: postEditData,
        selectedCategory: category.selectedCategory,
        categories: category.categories,
        categoryList: category.categoryList,
        backTo: post.backToCategory
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostAddForm)