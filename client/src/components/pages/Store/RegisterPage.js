import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, contactNumber, address }));
  };

  return (
    <div className="register-container">
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
            <input 
              type="text" 
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-control" 
              placeholder="Name" 
              required 
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              placeholder="Email" 
              required 
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              placeholder="Password" 
              required 
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
            <input 
              type="tel" 
              id="contactNumber"
              value={contactNumber} 
              onChange={(e) => setContactNumber(e.target.value)} 
              className="form-control" 
              placeholder="Contact Number" 
              required 
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Physical Address</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
            <input 
              type="text" 
              id="address"
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="form-control" 
              placeholder="Physical Address" 
              required 
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
