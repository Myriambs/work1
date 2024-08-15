import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginA = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/agence/login', { email, password });

      // Extract the token and status from the response
      const { token, status } = res.data;

      // Check if the status is "pending" or "cancelled"
      if (status === 'pending' || status === 'cancelled') {
        setError('Your account is either pending or cancelled. Please contact support.');
        return; // Prevent login
      }

      // If the status is confirmed, proceed with login
      await localStorage.setItem('token', token);
      navigate('/private');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h3 className="mb-0">Agence Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginA;
