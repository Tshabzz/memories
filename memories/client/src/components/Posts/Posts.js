import Post from './Post/Post'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'
import { useEffect } from 'react'
import { getPosts } from '../../actions/posts'

const Posts = () => {
    const posts = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts(dispatch));
    }, [])
    
    console.log(posts)
    return (
        <> 
            <h1>Posts</h1>
            <Post />
        </>
    );
}

export default Posts;