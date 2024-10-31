import React, { useState } from 'react';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './Styles.css'; // Import your CSS file

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <div className="App">
            {/* Logo Section */}
            <header>
                <img src="/logo111.png" alt="Logo" className="App-logo" />
            </header>
            {/* Main Content */}
            {currentUser ? (
                <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
            ) : (
                <Auth setCurrentUser={setCurrentUser} />
            )}
        </div>
    );
}

export default App;
