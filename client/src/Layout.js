import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import profileImage from './img.jpg';  // Adjust the path if necessary

function Layout({ children, onLogout }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        onLogout(); // Call the logout handler passed from App.js
        navigate('/'); // Redirect to login page
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Fitness Tracker App</h1>
                <span>
                    <button className={styles.signOutButton} onClick={handleSignOut}>Sign out</button>
                    <button className={styles.profileButton} onClick={handleProfile}>
                        <img src={profileImage} alt="Profile" className={styles.profileImage} />
                    </button>
                </span>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
