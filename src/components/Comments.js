import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllComments, changeNewCommentVisibility } from '../actions/commentActions';
import { map } from 'underscore';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
    }
    conditionalRender() {
        return this.props.comments.newCommentVisible ?
            <div class='panel panel-info'>
                <div class="panel-body">
                    <textarea placeholder="Write your comment here!" class="pb-cmnt-textarea"></textarea>
                    <form class="form-inline">
                    <button class="btn  pull-left" type="button">Submit</button>
                        <button onClick={this.handleClick} class="btn  pull-right" type="button">Cancel</button>
                    </form>
                </div>
            </div>

            :
            <button class="btn" onClick={this.handleClick}>Add New Comment</button>
    }
    render() {
        return (
            <div className="comments container">
                {Object.keys(this.props.comments.comments).length ?
                    map(this.props.comments.comments, (comment) => {
                        return (
                            <div className='row' key={comment._id}>
                            <p>{comment.created_by}</p>  
                            <p>{comment.body}</p>

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
        }
    };
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        loading: state.comments.loading,
        error: state.comments.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);