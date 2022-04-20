import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './pages/App/App.js';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,
    document.getElementById('root')
);