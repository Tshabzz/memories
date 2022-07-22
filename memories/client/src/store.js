import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import postsReducer from './features/postsSlice'
import thunk from 'redux-thunk'


export const store = configureStore({
    reducer: {
        posts: postsReducer
    }
}, applyMiddleware(compose(thunk)))

