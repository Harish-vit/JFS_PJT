import React, { useState } from 'react';

function SignIn({ onSignIn }) {
    const [username, setUsername] = useState('');

    const handleSignIn = () => {
        if (username) {
            onSignIn(username);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default SignIn;
