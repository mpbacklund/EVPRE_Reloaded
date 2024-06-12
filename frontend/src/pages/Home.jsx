import React from 'react';
import useFetch from '../useFetch';
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import NavBar from '../components/NavBar';

const Home = () => {
    const navigate = useNavigate();

    const navigateSignIn = () => {
        navigate('/signin');
    }

    const navigateSignUp = () => {
        navigate('/signup');
    }

    const navigateAbout = () => {
        navigate('/about');
    }

    const navigateSimulation = () => {
        navigate('/simulation');
    }

    return (
        <div className="hasNavBar">
            <NavBar />

            <Container className="md">
            <Card className='mb-3'>
                <Card.Img/>
                <Card.Body>
                    <Card.Title>FASTSim Simulator</Card.Title>
                    <Card.Text>Run the Vehicle Route Emissions Simulation Interface</Card.Text>
                    <Button variant="primary" onClick={navigateSimulation}>Run</Button>
                </Card.Body>
            </Card>
            </Container>
            <Container>
                <Row>
                    <Col className="d-flex align-items-stretch">
                        <Card className='mb-3 flex-fill' style={{ background: "#212529", color: "#FFFFFF" }}>
                            <Card.Img/>
                            <Card.Body>
                                <Card.Title>About</Card.Title>
                                <Card.Text>Learn more about how to use this simulation and about its development here.</Card.Text>
                                <Button variant="primary" onClick={navigateAbout}>Learn More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="d-flex align-items-stretch">
                    <Card className='mb-3 flex-fill'>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Already have an account?</Card.Title>
                            <Card.Text>Sign in to save your custom vehicle information. Otherwise, click below to register now.</Card.Text>
                            <Button variant="primary" className="me-2" onClick={navigateSignUp}>Sign up</Button>
                            <Button variant="primary" className="me-2" onClick={navigateSignIn}>Sign in</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;