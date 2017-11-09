import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCommentVisibility, fetchSingleArticle, articleAlterVotes } from '../actions/articleActions';
import { resetCommentState } from '../actions/commentActions';
import SingleArticle from '../containers/SingleArticle';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        this.props.getArticle(this.props.match.params.articleId);
    }
    handleClick(event) {
        const articleId = event.target.value;
        this.props.commentVisibility(articleId);
        this.props.removeUnsavedComments();
    }
    render() {
        return (
            <div className="article container">
                {this.props.articles.loading === false ?
                    Object.keys(this.props.articles.articles).map((article) => {
                        
                       return  <SingleArticle key={article}
                            handleClick={this.handleClick}
                            handleSubmit={this.props.adjustVote}
                            article={this.props.articles.articles[article]}
                            commentVisable={this.props.articles.articles[article].commentVisable} />;
                    }) : <div className='container-fluid loader'></div>
                }
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        commentVisibility: (id) => {
            dispatch(changeCommentVisibility(id));
        },
        getArticle: (articleId) => {
            dispatch(fetchSingleArticle(articleId));
        },
        removeUnsavedComments: () => {
            dispatch(resetCommentState());
        },
        adjustVote: (id, vote) => {
            dispatch(articleAlterVotes(id, vote));
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