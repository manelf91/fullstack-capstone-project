import React, { useState } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import './LoginPage.css';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setIsLoggedIn, setUserName} = useAppContext();

    const handleLogin = async () => {
        try {
            const response = await fetch(urlConfig.backendUrl + "/api/auth/login", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const json = await response.json();
            console.log('json data', json);
            console.log('er', json.error);

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', email);
                navigate("/app");
                setIsLoggedIn(true);
                setUserName(json.userName);
            } else if (json.error) {
                alert("Error in registration: " + json.error);
                return;
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <div>
                            <label for="email">Email:</label><br />
                            <input type="email" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} /><br /><br />

                            <label for="password">Password:</label><br />
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} /><br /><br />

                            <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                            <p className="mt-4 text-center">
                                New here? <a href="/app/register" className="text-primary">Register Here</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;