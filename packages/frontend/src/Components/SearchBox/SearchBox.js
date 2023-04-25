import React, { useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = e => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}` : '/search');
    };

    return (
        <Grid className='searchBoxGrid' id='searchWrapper'>
            <form onSubmit={submitHandler}>
                <TextField className="textFieldSearchBar" type="text" aria-label="search-products" aria-describedby='search-button' value={query} placeholder="search products" onChange={(e) => setQuery(e.target.value)}>
                </TextField>
                <IconButton className='search-button' id='search-button' type='submit' color='primary'>
                    <SearchIcon />
                </IconButton>
            </form>
        </Grid>
    )
}