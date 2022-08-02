import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import swal from 'sweetalert';
import { useLocation,useNavigate } from 'react-router-dom';
import { Search } from "../Search";

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}


const Form = ({currentID, setCurrentID, user, authState}) => {

    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;

    const [postData, setpostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const { posts } = useSelector(
        (state) => 
                state.posts
    );

    const updatedPost = currentID? posts.find((p) => p._id === currentID) : null;

    const dispatch = useDispatch();

    useEffect(() => {
        if(updatedPost) 
            setpostData(updatedPost);
    }, [updatedPost]);
    useEffect(() => {
        clear();
    }, [page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentID && authState)
        {
            dispatch(updatePost(postData._id,{...postData, name: user?.result.name})).then(() => {
                console.log("Post Updated.");
                swal({
                    title: "Post Successfully Updated",
                    icon: "success",
                });
            });
            
        }
        else if(authState)
        {
            dispatch(createPost({...postData, name: user?.result.name})).then(() => {
                console.log("Post Created.")
                swal({
                    title: "Post has been Successfully Posted",
                    icon: "success",
                });
            });
        }
        else
        {
            swal({
                title: "Sign In Required.",
                text: "Please Sign in to Post New Content.",
                icon: "warning",
            }).then(
                () => {
                    navigate("/auth");
                }
            );
        }
        clear();
    };

    const clear = () => {
        setCurrentID(null);
        setpostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };
    return(
        <Container>
            <Search />
            <form onSubmit={handleSubmit}>
                <FormTitle>
                    { currentID? 'Editing' : 'Create'} a Memory
                </FormTitle>
                <Inputs>
                    <input 
                        type="text" 
                        id="Title" 
                        placeholder="Title"
                        value={postData.title}
                        onChange={
                            (e) => setpostData({
                                    ...postData,
                                    title: e.target.value
                                })
                        }
                    >
                    </input>
                    <textarea 
                        placeholder="Message" 
                        rows={5} 
                        id="Message"
                        value={postData.message}
                        onChange={
                            (e) => setpostData({
                                    ...postData,
                                    message: e.target.value
                                })
                        }
                    >
                    </textarea>
                    <input 
                        type="text" 
                        id="Tags" 
                        placeholder="Tags (Coma Separated)"
                        value={postData.tags}
                        onChange={
                            (e) => setpostData({
                                ...postData,
                                tags: e.target.value.split(',')
                            })
                        }
                    >
                    </input>
                    <div id="file">
                        <FileBase 
                            type="file" 
                            multiple= {false}
                            onDone={
                                ({base64}) => setpostData({
                                    ...postData,
                                    selectedFile: base64
                                })
                            }
                        />
                    </div>
                    <button type="submit" id="Submit">Submit</button>
                    <button type="reset" onClick={clear} id="Clear">Clear</button>
                </Inputs>
            </form>
        </Container>
    );
};

export default Form;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
    background-color: white;
    box-sizing: border-box;
    min-width: 440px;
    @media (max-width: 756px)
    {
        width: 100%;
        min-width: fit-content;
    }
    form{
        padding: 20px;
        border-radius: 8px;
        box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
        width:100%;
        box-sizing: border-box;
    }
`;

const FormTitle = styled.div`
    box-sizing: border-box; 
    display: flex;
    margin: 8px;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
`;

const Inputs = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #Title,#Message,#Tags,#file,#Submit,#Clear{
        box-sizing: border-box;
        width: 98%;  
        margin: 4px;
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid grey;
        box-shadow: 0.5px 0.8px grey;
    }
    #Submit{
        background-color: blue;
        color: white;
        cursor: pointer;
    }
    #Clear{
        background-color: red;
        color: white;
        cursor: pointer;
    }
`;