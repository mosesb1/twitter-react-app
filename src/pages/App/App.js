import './App.css';
import {useState} from 'react';
import Tweet from '../../components/Tweet/Tweet';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import {Routes, Route, Navigate} from 'react-router-dom'

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <main>
            {
                user ? 
                <Routes>
                    <Route path='/home' element={<HomePage user={user} setUser={setUser}/>}/>
                    <Route path='/*' element={<Navigate to='/home' user={user} setUser={setUser}/>}/>
                </Routes> : 
                <AuthPage user={user} setUser={setUser}/>
            }
        </main>
    )
}