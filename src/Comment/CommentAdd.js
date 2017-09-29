import React, { Component } from 'react'
import {addComment} from './actions'
import MainLayout from '../MainLayout'


const BODY_INPUT = "BODY_INPUT"

class CommentAdd extends Component {
	componentDidMount() {
		
	}


	
	render() {
		const {body} = this.props
		return (<MainLayout mainClass="comment_add_v01" title="Add Comment">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group" >
						<textarea className="form-control" value={body} onChange={(e) => this.handleInputChange(e, BODY_INPUT)} >
						</textarea>
					</div>
					<div className="form-group" >
						<input className="btn btn-primary" type="submit" value="Add Post" />
					</div>
				</form>
			</MainLayout>)
	}
}

export default CommentAdd