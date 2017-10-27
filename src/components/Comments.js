import React, { Component } from 'react';

const comments = ['a', 'b', 'c', 'd']
class Comments extends Component {
    render() {
        return (
            <div className="comments">
                <p>comments</p>
                {comments.map((comment) => 
                    <div className='row'>{comment}</div>
                )}
            </div>
        );
    }
}

export default Comments;