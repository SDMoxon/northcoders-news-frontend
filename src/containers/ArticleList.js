import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArticleList extends Component {
    render() {
        return (
            <div className='row '>
                <div className='panel panel'>
                    <div className='panel-body'>
                    <NavLink to={`/articles/${this.props.article._id}`} >{this.props.article.title}</NavLink>
                        <p>{this.props.article.body}</p>
                        <p>{this.props.article.created_by}</p>
                        <form className="form-inline">
                            <p>Votes {this.props.article.votes}</p>
                            <button value={`up ${this.props.article._id}`} onClick={this.props.handleSubmit} className="btn btn-default pull-left" type="submit"> vote up</button>
                            <button value={`down ${this.props.article._id}`} onClick={this.props.handleSubmit} className="btn btn-default pull-left" type="submit"> vote down</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default ArticleList;
