import React,{ useState } from "react";
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Post = ({post, currentID , setCurrentID, user, authState}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [didLike, setDidLike] = useState(post.likes.find((like) => post.creator === (user?.result?.id || user?.result?._id)))

    function AlertSignIn()  
    {
        swal({
            title: "Sign In Required.",
            text: "Please Sign in to Like the Post.",
            icon: "warning",
        }).then(
            () => {navigate("/auth")}
        );
    }

    return(
        <Container>
            <Heading BgImg={post.selectedFile}>
                <Top>
                    {post.name}
                    {
                        // The Edit icon will be visible only if the user is the creator
                        (post.creator === (user?.result?._id || user?.result?.id))
                        &&
                        <button onClick={() => {
                            if(authState)
                                setCurrentID(post._id)
                            else
                                AlertSignIn();
                        }}>
                            <EditIcon />
                        </button>
                    }
                </Top>
                <Time>
                    {moment(post.createdAt).fromNow()}
                </Time>
            </Heading>
            <Body>
                <Tags>
                    {
                        post.tags.map((t) => (`#${t} `))
                    }
                </Tags>
                <Title>
                    {post.title}
                </Title>
                <Message>
                    {post.message}
                </Message>
                <Actions>
                    {/* Likes to be updated. */}
                    <Like>
                        <button onClick={() => {
                            if(authState)
                            {    
                                dispatch(likePost(post._id));
                                setDidLike(!didLike);
                            }
                            else
                                AlertSignIn();
                        }}>
                                {
                                    didLike? <FavoriteIcon /> : <FavoriteBorderIcon />
                                }
                        </button>
                        &nbsp; {post.likes.length} {`Like${post.likes.length>1?'s':' '}`}
                    </Like>
                    
                    {
                        authState
                        &&
                        post.creator === (user?.result.id || user?.result._id)
                        &&
                        <button onClick={() => {
                            if(authState)
                            {
                                swal({
                                    title: "Are you sure?",
                                    text: "Once deleted, you will not be able to recover this Post!",
                                    icon: "warning",
                                    buttons: ["Cancel", "Yes"],
                                    dangerMode: true,
                                })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        dispatch(deletePost(post._id)).then(() =>
                                            {
                                                console.log("post deleted.");
                                                swal("Your Post has been Deleted Successfully!", {
                                                    icon: "success",
                                                });
                                        });
                                    } else {
                                    swal("Your Post is Safe!");
                                    }
                                });
                            }
                            else
                                AlertSignIn();
                        }}>
                            <Delete>
                                <DeleteIcon />
                                Delete
                            </Delete>
                        </button>
                    }
                </Actions>
            </Body>
        </Container>
    );
};

export default Post;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
    width: 250px;
    height: 400px;
    margin: 10px;
    border-radius: 8px;
    button{
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
    }
    @media (max-width: 756px)
    {
        width: 100%;
        margin: 15px 0px 10px 0px;
    }
`;

EditIcon = styled(EditIcon)`
    cursor: pointer;
`;

const Heading = styled.div`
    background-image: ${props =>`url("${props.BgImg}")`};
    opacity: 0.9;
    background-position: center;
    background-size: cover;
    color: white;
    border-radius: 8px 8px 0 0;
    width: 100%;
    height: 200px;
`;

const Top = styled.div`
    padding: 5px 10px 1px 10px;
    display: flex;
    font-size: 1.2rem;
    justify-content: space-between;
    align-items: center;
`;
const Time = styled.div`
    padding: 0px 10px 1px 10px;
`;

const Body = styled.div`
    width: 100%;
    height:60%;
    background-color: white;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Tags = styled.div`
    padding: 10px 10px 0px 10px;
    color: grey;
    font-size: 0.9rem;
`;

const Title = styled.div`
    font-size: 1.3rem;
    padding: 0 10px 0 10px;
`;
const Message = styled.div`
    font-size: 1rem;
    padding: 0 10px 0 10px;
`;
const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;
const Like = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const Delete = styled(Like)`
    color: blue;
`;

FavoriteIcon = styled(FavoriteIcon)`
    color: red;
`;
FavoriteBorderIcon = styled(FavoriteBorderIcon)`
    color: red;
`;
