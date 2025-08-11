import React, { useState } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

import './RegisterPage.css';

function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setIsLoggedIn, setUserName} = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(urlConfig.backendUrl + "/api/auth/register", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const json = await response.json();
            console.log('json data', json);
            console.log('er', json.error);

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', email);
                navigate("/app");
                setIsLoggedIn(true);
                setUserName(firstName);
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
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <div>
                            <label for="fname">First name:</label><br />
                            <input type="text" id="fname" name="fname" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} /><br />

                            <label for="lname">Last name:</label><br />
                            <input type="text" id="lname" name="lname" value={lastName}
                                onChange={(e) => setLastName(e.target.value)} /><br /><br />

                            <label for="email">Email:</label><br />
                            <input type="email" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} /><br /><br />

                            <label for="password">Password:</label><br />
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} /><br /><br />

                            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                            <p className="mt-4 text-center">
                                Already a member? <a href="/app/login" className="text-primary">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;