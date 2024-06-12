import React, { useState } from 'react';
import { Container, Button, Card, Form } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signInButtonPress = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            if (response.status === 200 && response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                console.log(response.data)

                // Redirect to the desired page on successful sign in
                navigate('/');
            } else {
                setError('Sign in failed. Please check your credentials and try again.');
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
                        <Card.Title>Sign In</Card.Title>
                        <Card.Text>
                            <Form onSubmit={signInButtonPress}>
                                <Form.Group controlId='formEmail'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Example@email.com" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </Form.Group>
                                <Button type="submit" style={{ marginTop: '10px' }}>Sign In</Button>
                            </Form>
                            {error && <p>{error}</p>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default SignIn;
