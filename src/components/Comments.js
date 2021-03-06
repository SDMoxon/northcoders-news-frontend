import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchAllComments,
    changeNewCommentVisibility,
    resetCommentState,
    handelNewCommentInput,
    postComment,
    commentAlterVotes
} from '../actions/commentActions';
import '../styles/Comments.css'
class Comments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getComments(this.props.belongsTo);
    }
    handleClick() {
        this.props.newCommentVisibility();
        this.props.resetCommentForm()
    }
    handleChange(event) {
        event.preventDefault();
        const text = event.target.value;
        this.props.updateCommentInput(text);

    }
    handleTextSubmit(event) {
        event.preventDefault();
        const id = this.props.belongsTo;
        const text = this.props.comments.newCommentInput;
        this.props.newComment(id, text);
        this.props.resetCommentForm();
    }
    conditionalRender() {
        return this.props.comments.newCommentVisible ?
            <div className='panel'>
                <div className="panel-body">
                    <textarea value={this.props.comments.newCommentInput} onChange={this.handleChange} placeholder="Write your comment here!" className="pb-cmnt-textarea comments-box"></textarea>
                    <form className="form-inline">
                        <button onClick={this.handleTextSubmit} className="btn btn-default pull-left" type="submit">Submit</button>
                        <button onClick={this.handleClick} className="btn btn-default pull-left" type="button">Cancel</button>
                    </form>
                </div>
            </div>
            :
            <button className="btn btn-default" onClick={this.handleClick}>Add New Comment</button>;
    }
    render() {
        return (
            <div className="comments container">
                {Object.keys(this.props.comments.comments).sort((a, b) => {
                    return this.props.comments.comments[b].votes - this.props.comments.comments[a].votes;
                }).map((comment) => {
                    return (
                        <div className='row panel' key={comment}>
                            <div className='panel-body'>
                                <p>{this.props.comments.comments[comment].body}</p>
                                <p>{this.props.comments.comments[comment].created_by}</p>
                                <div className="row">
                                    <p className='col-sm-1'>Votes {this.props.comments.comments[comment].votes}</p>
                                    <button onClick={this.props.adjustVote.bind(null, comment, 'up')} type="submit"> <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                                    <button onClick={this.props.adjustVote.bind(null, comment, 'down')} type="submit"> <i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {this.conditionalRender()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (id) => {
            dispatch(fetchAllComments(id));
        },
        newCommentVisibility: () => {
            dispatch(changeNewCommentVisibility());
        },
        resetCommentForm: () => {
            dispatch(resetCommentState());
        },
        updateCommentInput: (input) => {
            dispatch(handelNewCommentInput(input))
        },
        newComment: ((id, text) => {

            const data = {
                belongs_To: id,
                body: text
            };
            dispatch(postComment(id, data));
        }),
        adjustVote: (id, vote) => {
            dispatch(commentAlterVotes(id, vote));
        }
    };
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        loading: state.comments.loading,
        error: state.comments.error,
        sending: state.comments.sending,
        newCommentInput: state.comments.newCommentInput
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);