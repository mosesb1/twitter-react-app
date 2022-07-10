import './App.css';
import {useState, useEffect} from 'react';
import AuthPage from '../AuthPage/AuthPage';
import Layout from '../../screens/layout/Layout';
import HomePage from '../HomePage/HomePage';
import ExplorePage from '../ExplorePage/ExplorePage';
import ShowPage from '../ShowPage/ShowPage'
import EditPage from '../EditPage/EditPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import BookmarkPage from '../BookmarkPage/BookmarkPage';
import Lists from '../Lists/Lists';
import Messages from '../Messages/Messages';
import AccountPage from '../AccountPage/AccountPage';
import SocketTest from '../SocketTest/SocketTest';
import { getUser } from '../../utilities/users-service';
import { findUser } from '../../utilities/users-api';
import {Routes, Route, Navigate} from 'react-router-dom';

export default function App() {
    const [user, setUser] = useState();
    const [searchText, setSearchText] = useState('');
    const [updateUser, setUpdateUser] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refreshUser = async () => {
        const foundUser = await findUser(user._id);
        setUser({
            ...user,
            email: foundUser.email,
            followers: foundUser.followers,
            following: foundUser.following,
            username: foundUser.username,
            likes: foundUser.likes,
            bookmarks: foundUser.bookmarks,
            avatar: foundUser.avatar
        });
    }

    useEffect(() => {
        setUser(getUser());
    },[])

    useEffect(() => {
        if(!user) return;
        refreshUser();
    },[updateUser])
    return (
        <main>
            {
                user ? 
                <Routes>
                    <Route path='/' element={<Layout user={user} setUser={setUser} searchText={searchText} setSearchText={setSearchText}/>}>
                        <Route index element={<HomePage user={user} setUser={setUser} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser} searchText={searchText}/>}/>
                        <Route path='/explore' element={<ExplorePage user={user} setUser={setUser} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser} searchText={searchText}/>}/>
                        <Route path='/:id' element={<ShowPage user={user} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>}/>
                        <Route path='/edit/:id' element={<EditPage user={user} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>}/>
                        <Route path='/user/:id' element={<ProfilePage user={user} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser} searchText={searchText}/>}/>
                        <Route path='/bookmarks' element={<BookmarkPage user={user} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser} searchText={searchText}/>}/>
                        <Route path='/messages' element={<Messages user={user} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser} searchText={searchText}/>}/>
                        <Route path='/account' element={<AccountPage user={user} setUser={setUser} setUpdateUser={setUpdateUser} updateUser={updateUser}/>}/>
                        <Route path='/socket' element={<SocketTest user={user}/>}/>
                        <Route path='/*' element={<Navigate to='/' user={user} setUser={setUser}/>}/>
                    </Route>
                </Routes> : 
                <AuthPage user={user} setUser={setUser}/>
            }
        </main>
    )
}