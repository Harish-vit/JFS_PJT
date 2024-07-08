import React from 'react';
import styles from './Layout.module.css';

function Layout({ children }) {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Fitness Tracker App</h1>
                <button className={styles.signOutButton}>Sign out</button>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
