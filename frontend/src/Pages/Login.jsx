import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        formData,
        { withCredentials: true }
      );

      // ✅ Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user)); // assuming backend sends { user: {...} }

      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reserve.svg" alt="banner" />
        </div>

        <div className="banner">
          <div className="reservation_form_box">
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">
                Login <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login