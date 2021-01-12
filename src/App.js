import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Upload from './pages/Upload.js';
import Gallery from './pages/Gallery.js';

function App() {
    return (
        <div className="container">
            <Router>
                <nav className="nav">
                    <div className="nav-brand">Joshua's Image Repository</div>
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route component={Upload} path="/upload" />
                    <Route component={Gallery} path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
