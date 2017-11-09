import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArticleList extends Component {
    render() {
        return (
            <div className='row '>
                <div className='panel panel'>
                    <div className='panel-body'>
                       <h4> <NavLink to={`/articles/${this.props.article._id}`} >{this.props.article.title}</NavLink></h4>
                        <p>{this.props.article.body.split(' ').slice(0,14).join(' ')}...</p>
                        <p>{this.props.article.created_by}</p>
                        <div className="row">
                            <p className='col-sm-1'>Votes {this.props.article.votes}</p>
                            <button className='fa fa-arrow-up' onClick={this.props.handleSubmit.bind(null, this.props.article._id, 'up')} type="submit"></button>
                            <button className='fa fa-arrow-down' onClick={this.props.handleSubmit.bind(null, this.props.article._id, 'down')} type="submit"></button>
                        </div>
                        </div>
                    </div>
                </div>
                );
    }
}


export default ArticleList;
