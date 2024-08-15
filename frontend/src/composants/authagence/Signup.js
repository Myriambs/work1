import React, { useState } from 'react';
import { signupAccount } from '../../api/authAgence';
import { useNavigate } from 'react-router-dom';

const SignupA = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numero, setNumero] = useState('');
  const [adress, setAdress] = useState('');
  const [cin, setCin] = useState('');
  const [matricule, setMatricule] = useState('');

  const handleSignup = async (value) => {
    try {
      await signupAccount(value);
      navigate('/login');
    } catch (error) {
      console.error("Signup failed", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Agence Registration</h2>
              <small>Let us create your agency account</small>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="form-group">
                  <label htmlFor="numero">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin">CIN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cin"
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="matricule">Matricule</label>
                  <input
                    type="text"
                    className="form-control"
                    id="matricule"
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-4"
                  onClick={() => handleSignup({ name, email, password, numero, adress, cin, matricule })}
                >
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                By signing up you are agreeing to our{" "}
                <a href="#">Terms and Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupA;
