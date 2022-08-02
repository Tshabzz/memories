import React,{ useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from '../actions/posts';

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

const Paginate = () => {

    
    const query = useQuery();
    const page = query.get('page') || 1;

    const { numberOfPages, currentPage } = useSelector(
        (state) => 
                state.posts
    );
    return(
        <Pagination
            count = {numberOfPages}
            page = {Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />
    )
};

export default Paginate;