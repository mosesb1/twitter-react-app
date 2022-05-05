import './App.css';
import {useState, useEffect} from 'react';
import Tweet from '../../components/Tweet/Tweet';
import AuthPage from '../AuthPage/AuthPage';
import Layout from '../../screens/layout/Layout';
import HomePage from '../HomePage/HomePage';
import ShowPage from '../ShowPage/ShowPage'
import EditPage from '../EditPage/EditPage';
import { getUser } from '../../utilities/users-service';
import {Routes, Route, Navigate} from 'react-router-dom';

export default function App() {
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setUser(getUser());
    },[])
    return (
        <main>
            {
                user ? 
                <Routes>
                    <Route path='/' element={<Layout user={user}/>}>
                        <Route index element={<HomePage user={user} setUser={setUser} refresh={refresh} setRefresh={setRefresh}/>}/>
                        <Route path='/:id' element={<ShowPage user={user} refresh={refresh} setRefresh={setRefresh}/>}/>
                        <Route path='/edit/:id' element={<EditPage user={user} refresh={refresh} setRefresh={setRefresh}/>}/>
                        <Route path='/*' element={<Navigate to='/' user={user} setUser={setUser}/>}/>
                    </Route>
                </Routes> : 
                <AuthPage user={user} setUser={setUser}/>
            }
        </main>
    )
}