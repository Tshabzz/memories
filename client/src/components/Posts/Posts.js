import React,{useEffect} from "react";
import Post from './Post/Post';
import { CircularProgress } from "@material-ui/core";
import { useLocation,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch,useSelector } from "react-redux";
import Paginate from "../Pagination";

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

const Posts = ({ currentID ,setCurrentID, user, authState}) => {

    const dispatch = useDispatch();

    const { posts } = useSelector(
        (state) => 
                state.posts
    );

    return(
        !posts ? 
            <Container>
                <CircularProgress id="loading" />
            </Container>
            :
            (
                <Container>
                    {
                        posts.map((post) => (
                            <Card key={post._id} >
                                <Post post={post} currentID= {currentID} setCurrentID={setCurrentID} user={user} authState={authState}/>
                            </Card>
                        ))
                    }
                    <Pages>
                        <Paginate />
                    </Pages>
                </Container>
            )
    );
};

export default Posts;

const Container = styled.div`
    min-width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    @media (max-width: 756px)
    {
        width: 100%;
    }
    #loading{
        margin: 20px;
    }
`;

const Card = styled.div`
    @media (max-width: 756px)
    {
        width: 95%;
    }
`;

const Pages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
`;