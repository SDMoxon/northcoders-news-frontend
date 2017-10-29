import React, { Component } from 'react';
import Comments from './Comments';
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisability } from '../actions/articleActions';
import { map } from 'underscore';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log('next',nextProps.match.path);
        console.log('current', this.props.match.path);
        const currentTopic = this.props.match.params.id;
        const nextTopic = nextProps.match.params.id;
        if (nextTopic !== currentTopic) {
            this.props.getArticles(nextProps.match.params.id);
        }
    }
    componentDidMount() {
        this.props.getArticles(this.props.match.params.id);
    }
    handleClick(e) {
        const articleId = e.target.value;
        this.props.commentVisability(articleId);
    }
    conditionalRender(article) {
        if (Object.keys(this.props.articles.articles).length > 1) {
            return (
                <div key={article._id}>
                    <div className='row' >{article.title}</div>
                </div>
            );
        }
        else {
            return (
                <div key={article._id}>
                    <div className='row' >{article.title}</div>
                    {
                        this.props.articles.articles[article._id].commentVisable ?
                            <div>
                                <button onClick={this.handleClick} value={article._id}>Hide Comments</button>
                                <Comments belongsTo={article._id} />
                            </div>
                            :
                            <button onClick={this.handleClick} value={article._id}>Show Comments</button>
                    }
                </div>
            );
        }
    }
    render() {
        return (
            <div className="articles container">

                {Object.keys(this.props.articles.articles).length ?
                    map(this.props.articles.articles, (article) => {
                        return this.conditionalRender(article)
                    }) : 'Loading'

                }
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getArticles: (id) => {
            dispatch(fetchAllArticles(id));
        },
        commentVisability: (id) => {
            dispatch(changeCommentVisability(id));
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles,
        loading: state.articles.loading,
        error: state.articles.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);