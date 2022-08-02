import React, { useEffect , useState} from 'react';
import Form from './Form/form';
import Posts from './Posts/Posts';
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../actions/posts';
import { useLocation,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { LOAD_PAGE } from '../constants/ActionTypes.js';


function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

function Home({user, setUser, authState}) {
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const tags = query.get('tags');

    const [currentID, setCurrentID] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_PAGE
        });
        if(searchQuery || tags)
        {
            const searchTitle = searchQuery?.trim();
            dispatch(getPostsBySearch(searchTitle, tags));
        }
        else  
            dispatch(getPosts(Number(page) || 1));
    }, [dispatch,page,searchQuery,tags]);

  return (
        <Body>
            <Posts currentID= {currentID} setCurrentID= {setCurrentID} user={user} authState={authState}/>
            <Form currentID= {currentID} setCurrentID= {setCurrentID} user={user} authState={authState}/> 
        </Body>
  );
}

export default Home;

const Body = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    width: 95vw;
    @media (max-width: 756px)
    {
        flex-direction: column-reverse;
    }
`;