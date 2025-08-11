import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, userName } = useAppContext();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className="nav-item" key="home">
                        <a className="nav-link" href="/home.html">Home</a>
                    </li>
                    <li className="nav-item" key="gifts">
                        <a className="nav-link" href="/app">Gifts</a>
                    </li>
                    <li className="nav-item" key="search">
                        <a className="nav-link" href="/app/search">Search</a>
                    </li>
                    <ul className="navbar-nav ml-auto">
                        {
                            isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/app/profile">Welcome {userName}</Link>
                                </li>
                            ) : (
                                <>
                                <li className="nav-item">
                                    <Link className="nav-link login-btn" to="/app/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link register-btn" to="/app/register">Register</Link>
                                </li>
                                </>
                            )
                        }
                    </ul>
                </ul>
            </div>
        </nav >
    );
}
