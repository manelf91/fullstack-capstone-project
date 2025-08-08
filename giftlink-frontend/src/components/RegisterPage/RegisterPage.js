import React, { useState } from 'react';
import { urlConfig } from '../../config';

import './RegisterPage.css';

function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log("Register invoked");
        return;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <form action={handleRegister()}>
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

                            <input type="submit" value="Submit"></input>
                        </form>
                        {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;