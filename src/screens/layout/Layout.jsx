import '../../pages/App/App.css';
import { Outlet } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import { useState, useEffect } from 'react';

export default function Layout() {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const scriptTag = document.createElement('script');

        scriptTag.src = "https://kit.fontawesome.com/9fc456baff.js";
        scriptTag.async = true;

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);

    return (
        <div className='layout'>
            <main>
                <SearchBar setSearchText={setSearchText}/>
                <NavBar/>
                <Outlet searchText={searchText}/>
            </main>
        </div>
    )
}