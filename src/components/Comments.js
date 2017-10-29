import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllComments } from '../actions/commentActions';
import { map } from 'underscore';

class Comments extends Component {
    componentDidMount() {
        this.props.getComments(this.props.belongsTo);
    }
    render() {
        return (
            <div className="comments container">
                {Object.keys(this.props.comments.comments).length ?
                    map(this.props.comments.comments, (comment) => {
                        return (
                        <div className='row' key={comment._id}>{comment.body}</div>
                        );
                    }) : 'Loading'

                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (id) => {
            dispatch(fetchAllComments(id));
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