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
import { map } from 'underscore';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const currentCommentVisible = this.props.comments.newCommentVisible;
        const nextCommentVisible = nextProps.comments.newCommentVisible;
        if (nextCommentVisible !== currentCommentVisible) {
            this.props.getComments(this.props.belongsTo);
        }
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
    handleSubmit(event) {
        event.preventDefault();
        const eventValues = event.target.value.split(' ');

        const vote = eventValues[0];
        const id = eventValues[1];
        this.props.adjustVote(id, vote);
    }
    conditionalRender() {
        return this.props.comments.newCommentVisible ?
            <div className='panel'>
                <div className="panel-body">
                    <textarea value={this.props.comments.newCommentInput} onChange={this.handleChange} placeholder="Write your comment here!" className="pb-cmnt-textarea"></textarea>
                    <form className="form-inline">
                        <button onClick={this.handleTextSubmit} className="btn  pull-left" type="submit">Submit</button>
                        <button onClick={this.handleClick} className="btn  pull-left" type="button">Cancel</button>
                    </form>
                </div>
            </div>

            :
            <button className="btn" onClick={this.handleClick}>Add New Comment</button>;
    }
    render() {
        return (
            <div className="comments container">
                {Object.keys(this.props.comments.comments).length ?
                    map(this.props.comments.comments, (comment) => {
                        return (
                            <div className='row panel panel-info' key={comment._id}>
                                <div className='panel-body'>
                                    <p>{comment.created_by}</p>
                                    <p>{comment.body}</p>
                                    <form className="form-inline">
                                        <p>Votes {comment.votes}</p>
                                        <button value={`up ${comment._id}`} onClick={this.handleSubmit} className="btn  pull-left" type="submit"> vote up</button>
                                        <button value={`down ${comment._id}`} onClick={this.handleSubmit} className="btn  pull-left" type="submit"> vote down</button>
                                    </form>
                                </div>
                            </div>
                        );
                    }) : 'Loading'

                }
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
        adjustVote: (id,vote) => {
            dispatch(commentAlterVotes(id,vote));
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