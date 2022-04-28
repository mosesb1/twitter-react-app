import { useState } from "react";
import './SearchBar.module.css';

export default function SearchBar({setSearchText}) {
    const [input, setInput] = useState('');

    const handleChange = (evt) => {
        setInput(evt.target.value);
    }
    return (
        <form>
            <input type='text' placeholder='search' />
            <input type='submit' value='submit' />
        </form>
    )
}