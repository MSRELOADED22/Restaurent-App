import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/register',
        { name, email, password },
        { withCredentials: true }
      )

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data))
      toast.success('Registered and Logged in successfully!')

      // Redirect to home (and force navbar update)
      window.location.href = '/'
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reserve.svg" alt="banner" />
        </div>

        <div className="banner">
          <div className="reservation_form_box">
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">
                Register
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register