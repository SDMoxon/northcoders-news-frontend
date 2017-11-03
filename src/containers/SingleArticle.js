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
                        <form className="form-inline">
                            <p>Votes {this.props.article.votes}</p>
                            <button value={`up ${this.props.article._id}`} onClick={this.props.handleSubmit} className="btn btn-default pull-left" type="submit"> vote up</button>
                            <button value={`down ${this.props.article._id}`} onClick={this.props.handleSubmit} className="btn btn-default pull-left" type="submit"> vote down</button>
                        </form>
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






