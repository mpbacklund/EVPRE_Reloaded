import React, { useState} from 'react';
import useFetch from '../useFetch';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form} from 'react-bootstrap'
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUpButtonPress = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/signup', { email, username, password });
            if (response.status === 200 && response.data.user) {
                
                localStorage.setItem('token', response.data.token);

                // Redirect to the desired page on successful sign in
                navigate('/');
            } else {
                setError('Sign up failed. Please check your credentials and try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.log(err);
        }
    }

    return (
        <div class="hasNavBar">
            <NavBar />

            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Sign Up</Card.Title>
                        <Card.Text>
                            <Form onSubmit={signUpButtonPress}>
                                <Form.Group controlId='formUsername'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="username"
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group controlId='formEmail'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group controlId='formPassword'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Form.Text className='text-muted'>
                                        We'll never share your personal information
                                    </Form.Text>
                                </Form.Group>
                                <Button type="submit">Sign Up</Button>
                            </Form>
                            {error && <p>{error}</p>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default SignUp;