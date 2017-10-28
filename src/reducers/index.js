import {combineReducers} from 'redux';
import {topicsReducer} from './topicsReducer';
import {articlesReducer} from './articlesReducer';
import {commentsReducer} from './commentsReducer.js';


export default combineReducers({
    articles: articlesReducer,
    topics: topicsReducer,
    comments: commentsReducer
});