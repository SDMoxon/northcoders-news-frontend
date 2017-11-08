import React, { Component } from 'react';
import Comments from '../components/Comments';

class SingleArticle extends Component {
    render() {
        return (
            <div className='row '>
                <div className='panel panel'>
                    <div className='panel-body'>
                        <p>{this.props.article.title}</p>
                        <p>{this.props.article.body}</p>
                        <p>{this.props.article.created_by}</p>
                        <div className="row">
                            <p className='col-sm-1'>Votes {this.props.article.votes}</p>
                            <button onClick={this.props.handleSubmit.bind(null, this.props.article._id, 'up')} type="submit"> <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                            <button onClick={this.props.handleSubmit.bind(null, this.props.article._id, 'down')} type="submit"> <i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                {
                    this.props.commentVisable ?
                        <div>
                            <button className="btn btn-default" onClick={this.props.handleClick} value={this.props.article._id}>Hide Comments</button>
                            <Comments belongsTo={this.props.article._id} />
                        </div>
                        :
                        <button className="btn btn-default" onClick={this.props.handleClick} value={this.props.article._id}>Show Comments</button>
                }
            </div>
        );
    }
}

export default SingleArticle;






