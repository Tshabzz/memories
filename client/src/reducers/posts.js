import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, FETCH_BY_SEARCH,LOAD_PAGE } from '../constants/ActionTypes';

export default (
    state = [], action) => {
        switch (action.type) {
            case LOAD_PAGE:
                return {...state, posts: null}
            case DELETE:
                return {
                    ...state,
                    posts: state.posts.filter((post) => post._id !== action.payload)
                }
            case LIKE_POST:
                return {
                    ...state,
                    posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
                }
            case UPDATE:
                return {
                    ...state,
                    posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
                }
            case FETCH_ALL:
                return {
                    ...state,
                    posts: action.payload.data,
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages
                }
            case FETCH_BY_SEARCH:
                return {
                    ...state,
                    posts: action.payload.data,
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages
                }
            case CREATE:
                return {
                    ...state,
                    posts: [...state.posts, action.payload]
                }
            default:
                return state;
    }
};