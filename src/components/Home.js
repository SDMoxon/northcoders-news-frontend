import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles, articleAlterVotes } from '../actions/articleActions';
import ArticleList from '../statelessComponents/ArticleList';
import { Redirect } from 'react-router';

class Home extends Component {
    componentWillMount() {
        // checks to see if there are different topics in the articles object, if not request the full articles list
        const articleArray = Object.keys(this.props.articles.articles);
        const refreshArticles = articleArray.reduce((acc, article, i) => {
            const nextArticle = articleArray[i + 1];
            if (i < articleArray.length - 2) {
                if (this.props.articles.articles[article].belongs_to !== this.props.articles.articles[nextArticle].belongs_to) {
                    acc = false;
                }
            }
            return acc;
        }, true);

        if (Object.keys(this.props.articles.articles).length === 0 || refreshArticles) {
            this.props.getArticles();
        }
    }
    render() {
        if (!this.props.login.authorised) {
            return <Redirect to="/login" />;
        }
        else {
            return (
                <div className="home container">
                    {this.props.articles.loading === false ?
                        Object.keys(this.props.articles.articles).sort((a, b) => {
                            return this.props.articles.articles[b].votes - this.props.articles.articles[a].votes;
                        }).map((article) => {
                            return <ArticleList
                                key={article}
                                id={this.props.match.params.id}
                                handleClick={this.handleClick}
                                handleSubmit={this.props.adjustVote}
                                article={this.props.articles.articles[article]} />;
                        }) : <div className='container-fluid loader'></div>
                    }
                </div>
            );
        }
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getArticles: (id) => {
            dispatch(fetchAllArticles(id));
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
        error: state.articles.error,
        login: state.login
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);