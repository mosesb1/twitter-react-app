import './App.css';
import {useState} from 'react';
import Tweet from '../../components/Tweet/Tweet';
import AuthPage from '../AuthPage/AuthPage';

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <main>
            {
                user ? <h1>App</h1> : <AuthPage />
            }
        </main>
    )
}