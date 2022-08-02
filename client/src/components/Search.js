import React,{ useState } from 'react';
import styled from 'styled-components';
import { useLocation,useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../actions/posts.js';

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

export const Search = () => {

    const [searchTitle, setSearchTitle ] = useState('');
    const [searchBy, setSearchBy] = useState('Title');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const query = useQuery();
    const page = query.get('page') || 1;
    const SearchQuery = query.get('searchQuery');

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchTitle.trim() !== '' || tags.join(','))
        {
            // Dispatch the Search.
            const tag = tags?.join(',');
            navigate(`/posts/search?searchQuery=${searchTitle || 'none' }&tags=${tag || 'none' }`);
        }
        else
        {
            navigate("/");
        }
    };
    const handleAdd = (e) => {
        setTags([...tags, e]);
    };
    const handleDelete = (e) => {
        setTags(tags.filter((tag) => tag !== e));
    };

    return (
            <Container>
                <form onSubmit={handleSearch} id="search">
                    <Inputs>
                        <select id="SearchBy" onChange={(e) => { setSearchBy(e.target.value); }}>
                            <option value="Title">Title</option>
                            <option value="Tags">Tags</option>
                        </select>
                        {
                            searchBy === 'Title'? 
                                <input 
                                    type="text" 
                                    id="title" 
                                    placeholder="Search Title"
                                    onChange={
                                        (e) => setSearchTitle(e.target.value)
                                    }
                                />
                                :
                                <ChipInput
                                    style={{
                                        borderTop: '1px solid grey',
                                        margin: '0px',
                                        boxSizing: 'border-box'
                                    }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                />
                        }
                        <button type="submit" id="search_btn">
                            <SearchIcon  id="search_icon"/>
                        </button>
                    </Inputs>
                </form>
            </Container>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px 0px;
    #search{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Inputs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    #title,#SearchBy{
        height: 57px;
        font-size: 1rem;
        box-sizing: border-box;
        border: 1px solid grey;
        padding: 10px;
    }
    #search_btn{
        height: 57px;
        background-color: #0000ff;
        border: inherit;
        border-radius: 0px 8px 8px 0px;
        padding: 5px;
        cursor: pointer;
    }
    #SearchBy{
        border-radius: 8px 0px 0px 8px;
    }
    #search_icon{
        font-size: 2rem;
        color: white;
    }
`;  
