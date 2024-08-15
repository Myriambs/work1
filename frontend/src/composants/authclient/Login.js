import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (values) => {
    try {
      const res = await axios.post('http://localhost:4000/users/login', values);
      console.log("res=>", res);
      await localStorage.setItem('token', res.data.token);
      navigate('/private');
    } catch (err) {
      console.log(err);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Welcome Back</h2>
              <small>Log in to access your account</small>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-4"
                  onClick={() => handleLogin({ email, password })}
                >
                  Log In
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                By logging in you are agreeing to our{" "}
                <a href="#">Terms and Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginC;
