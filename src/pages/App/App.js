import './App.css';
import {useState} from 'react';
import Tweet from '../../components/Tweet/Tweet';
import AuthPage from '../AuthPage/AuthPage';
import Layout from '../../screens/layout/Layout';
import HomePage from '../HomePage/HomePage';
import ShowPage from '../ShowPage/ShowPage'
import {Routes, Route, Navigate} from 'react-router-dom'

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <main>
            {
                user ? 
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage user={user} setUser={setUser}/>}/>
                        <Route path='/:id' element={<ShowPage user={user}/>}/>
                        <Route path='/*' element={<Navigate to='/' user={user} setUser={setUser}/>}/>
                    </Route>
                </Routes> : 
                <AuthPage user={user} setUser={setUser}/>
            }
        </main>
    )
}