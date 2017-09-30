import React, { Component } from 'react'

import {Link} from 'react-router-dom'

class PostList extends Component {

	render() {
		const {posts} = this.props
		return(<div className="post-list">
					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
				                <tr>
				                  <th>Score</th>
				                  <th>Title</th>
				                  <th>Body</th>
				                  <th>Options</th>
				                </tr>
				             </thead>
				             <tbody>
				             {posts.map((post) => (
								<tr key={post.id}>
								  <td>{post.voteScore}</td>
				                  <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
				                  <td>{post.body}</td>
				                  <td>
				                  	<div className="form-group">
				                  	<input type="button" className="btn" value="up"/>
				                  	<input type="button" className="btn" value="down"/>
				                  	</div>
				                  </td>
				                </tr>
							))} 
				              </tbody>
						</table>
					</div>
			    </div>)
	}
}

export default PostList