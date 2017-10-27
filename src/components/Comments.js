import React, { Component } from 'react';

const comments = ['a', 'b', 'c', 'd']
class Comments extends Component {
    render() {
        return (
            <div className="comments">
                <p>comments</p>
                {comments.map((comment) => 
                    <p>{comment}</p>
                )}
            </div>
        );
    }
}

export default Comments;