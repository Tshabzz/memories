import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, FETCH_BY_SEARCH } from '../constants/ActionTypes';

// Action Creators: They are functions that return actions.
export const getPosts = (page) => async (dispatch) => {
    try {

        const { data } = await api.fetchPosts(page);

        dispatch({
            type: FETCH_ALL,
            payload: data
        });

    } catch (error) {
        console.log(error);
    }

};
export const getPostsBySearch = (searchTitle, tags) => async (dispatch) => {
    try {

        const { data } = await api.fetchPostsBySearch(searchTitle,tags);    

        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        });

    } catch (error) {
        console.log(error);
    }

};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, updatedPost) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id, updatedPost);
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
};
