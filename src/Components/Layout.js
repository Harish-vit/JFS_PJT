import Styles from './Layout.module.css'

function Layout({children}) {
    return (
        <div>
            <div className={Styles.header}>
                <h1 className={Styles.title}>Fitness Tracker App</h1>
                <button className={Styles.signOutButton}>Sign out</button>
            </div>
            <div className={Styles.content}>
                    {children}
            </div>
        </div>
    )
}

export default Layout