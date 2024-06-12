import React, { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/test_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to manage navbar collapse

  useEffect(() => {
    setIsLoggedIn(Boolean(data?.username));
  }, [data]);

  if (error) {
    console.log(error);
  }

  const navigate = useNavigate();

  const navigateSignIn = () => {
    navigate('/signin');
    setExpanded(false); // Close navbar after navigation
  }

  const navigateSignUp = () => {
    navigate('/signup');
    setExpanded(false); // Close navbar after navigation
  }

  const navigateAbout = () => {
    navigate('/about');
    setExpanded(false); // Close navbar after navigation
  }

  const navigateSimulation = () => {
    navigate('/simulation');
    setExpanded(false); // Close navbar after navigation
  }

  const navigateHome = () => {
    navigate('/');
    setExpanded(false); // Close navbar after navigation
  }

  const logout = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      const response = await axios.post('http://localhost:8000/logout', null, config);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login status

        // Redirect to the desired page on successful log out
        navigate('/');
        setExpanded(false); // Close navbar after navigation
      } else {
        console.log("There was an error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top" expand="lg" expanded={expanded} onToggle={(expanded) => setExpanded(expanded)} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={navigateHome}>{isLoggedIn && data?.username || "anonymous"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link onClick={navigateHome}>Home</Nav.Link>
            <Nav.Link onClick={navigateSimulation}>Simulator</Nav.Link>
            <Nav.Link onClick={navigateAbout}>About</Nav.Link>
          </Nav>
          <Nav > 
            {isLoggedIn ? (
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
            ) : (
              <>
                <Nav.Link onClick={navigateSignUp}>Sign Up</Nav.Link>
                <Nav.Link onClick={navigateSignIn}>Sign In</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
