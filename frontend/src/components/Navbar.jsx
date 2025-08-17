import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user); // convert to true/false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav>
      <div className="logo">RAAFEENIA</div>

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {data[0].navbarLinks.map((element) => (
            <Link
              to={element.link}
              spy={true}
              smooth={true}
              duration={500}
              key={element.id}
            >
              {element.title}
            </Link>
          ))}
        </div>

        <Link to="menu" spy={true} smooth={true} duration={500}>
          <button className="menuBtn">MENU</button>
        </Link>

        {!isAuthenticated ? (
          <>
            <button className="authBtn" onClick={() => navigate('/register')}>
              SIGN UP
            </button>
            <button className="authBtn" onClick={() => navigate('/login')}>
              LOG IN
            </button>
          </>
        ) : (
          <button className="authBtn" onClick={handleLogout}>
            LOGOUT
          </button>
        )}
      </div>

      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;