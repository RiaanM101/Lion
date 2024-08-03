import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../../redux/authSlice';
import { register } from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AuthPage.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const addressInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => handleScriptLoad();
        document.head.appendChild(script);
      } else {
        handleScriptLoad();
      }
    };

    const handleScriptLoad = () => {
      if (window.google && window.google.maps) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' } // Adjust as needed
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          setAddress(place.formatted_address);
        });
      }
    };

    loadGoogleMapsScript();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character';
    }
    if (!contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (!address) {
      newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const userData = await register({ email, password, username, contactNumber, address });
      dispatch(registerAction(userData));
      Swal.fire({
        title: 'Success!',
        text: 'User registered successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Redirect or perform any other action after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Register</h2>
        <div className="form-group">
          <label htmlFor="username" className="auth-label">
            <FontAwesomeIcon icon={faUser} /> Username
          </label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="auth-label">
            <FontAwesomeIcon icon={faUser} /> Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="auth-label">
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber" className="auth-label">
            <FontAwesomeIcon icon={faPhone} /> Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address" className="auth-label">
            <FontAwesomeIcon icon={faAddressBook} /> Address
          </label>
          <input
            type="text"
            id="address"
            ref={addressInputRef}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
