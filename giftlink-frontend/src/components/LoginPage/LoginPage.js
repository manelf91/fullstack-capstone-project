import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    handleLogin = async () => {
        console.log("Login invoked");
        return;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <form action={handleLogin()}>
                            <label for="email">Email:</label><br />
                            <input type="email" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} /><br /><br />

                            <label for="password">Password:</label><br />
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} /><br /><br />

                            <input type="submit" value="Submit"></input>
                        </form>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;