import { useState } from "react";
import './SearchBar.module.css';

export default function SearchBar({setSearchText, searchText}) {

    const handleChange = (evt) => {
        setSearchText(evt.target.value);
    }


    return (
        <form>
            <input className="searchbar" type='text' placeholder='search' value={searchText} onChange={handleChange}/>
        </form>
    )
}