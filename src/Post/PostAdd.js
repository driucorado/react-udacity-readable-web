import React, {Component} from 'react';
import {createPost, editPost, getPost, registerChangeData, savePost, togglePostEdition} from './actions'
import {connect} from 'react-redux'

class PostAdd extends Component {

    handleSubmit = (e) => {
        const {createPost, editPost, togglePostEdition, post, isPostPage} = this.props
        e.preventDefault();

        if (post.id) {
            editPost(post)
            togglePostEdition(isPostPage ? post.id : null)
        } else {
            createPost(post)
            togglePostEdition(null)
        }
    }

    onChange = (id, data) => {
        const {registerChangeData} = this.props
        registerChangeData(id, data)
    }

    render() {
        const {post, categories, categoryList, selectedCategory} = this.props
        const saveButtonTitle = (post.id) ? `Save Changes` : `Create Post`
        const showCategoriesList = categoryList.length === 0 ? (selectedCategory ? [selectedCategory] : [] ) : categoryList
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" value={post.title} placeholder={`Title`}
                               onChange={(e) => this.onChange(post.id, {title: e.target.value})}/>
                    </div>
                    <div className="form-group">
					<textarea className="form-control" value={post.body} placeholder={`Post Body`}
                              onChange={(e) => this.onChange(post.id, {body: e.target.value})}>
					</textarea>
                    </div>
                    <div className="form-group">
                        <select
                            value={post.category ? post.category : selectedCategory}
                            onChange={(e) => this.onChange(post.id, {category: e.target.value})}
                            className="form-control"
                        >
                            {showCategoriesList.map((category) =>
                                <option key={categories[category].path}
                                        value={categories[category].path}>{categories[category].name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder={`Author Name`} value={post.author}
                               onChange={(e) => this.onChange(post.id, {author: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value={saveButtonTitle}/>
                    </div>
                </form>
            </div>)
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
        registerChangeData: (postId, data) => dispatch(registerChangeData(postId, data))
    }
}

const mapStateToProps = ({post, category}) => {
    const postEditData = (post.currentPost) ? post.posts[post.currentPost] : post.newPost
    return {
        post: postEditData,
        selectedCategory: category.selectedCategory,
        categories: category.categories,
        categoryList: category.categoryList
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostAdd)