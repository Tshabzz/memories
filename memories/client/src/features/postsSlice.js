import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers/posts';

const initState = []

export const postsSlice = createSlice({
    name: 'posts',
    initialState: initState,
    reducer: reducers
})


export default postsSlice.reducer
