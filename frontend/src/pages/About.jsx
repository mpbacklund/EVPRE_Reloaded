import React from 'react';
import useFetch from '../useFetch';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form} from 'react-bootstrap'
import NavBar from '../components/NavBar';
import {useNavigate} from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();

    const navigateSimulation = () => {
        navigate('/simulation');
    }

    const navigateGitHub = () => {
        window.location.href = 'http://github.com'
    }

    return (
        <div class="hasNavBar">
            <NavBar />

            <Container classname="md">
                <Card className='mb-3'>
                    <Card.Img/>
                    <Card.Body>
                        <Card.Title>About FASTSim Simulator</Card.Title>
                        <Card.Text> 
                            This Vehicle Route Emissions Simulation software provides an interface through which users can run transportation data for electric vehicles through simulations/models of their choosing in a very simple and intuitive way, requiring little to no technical knowledge on their part of how the model works or how it is run. This will be possible through a Django-based backend for running simulations in Docker containers. The system will provide a platform for managing a variety of different simulations. 
                            <br />
                            <br />
                            Users of this service will be able to use simulation models that would otherwise involve a complex process to run. We expect the system will be used by researchers and scientists, as well as city and transportation planners, who are trying to measure the environmental impacts of electric vehicle usage and/or optimize routes for electric vehicles. The software can also be used by the everyday electric vehicle owner for these same purposes. 
                        </Card.Text>
                        <Button variant="primary" onClick={navigateSimulation} >Run</Button>
                    </Card.Body>
                </Card>
                <Row>
                    <Col className="d-flex align-items-stretch">
                        <Card className='mb-3 flex-fill' style={{ background: "#212529", color: "#FFFFFF" }}>
                            <Card.Img/>
                            <Card.Body>
                                <Card.Title>Acknowledgements</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="d-flex align-items-stretch">
                    <Card className='mb-3 flex-fill'>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Technical specs</Card.Title>
                            <Card.Text>
                            A few preset simulations will be provided to the user, including an electric vehicle range simulation, which will incorporate API calls to calculate possible routes and ranges from a user-specified location. Vehicle presets will be stored in a database to be utilized in these simulations. The system will allow users to upload simulation data, create and manage simulations, and retrieve simulation results. The option for custom simulation models and vehicles will be implemented with additional time on the project. 
                            <br />
                            <br />
                            The system will include the following features: 
                            <ul>
                                <li>Docker container management: The system will be responsible for creating and managing Docker containers for running simulations. </li>
                                <li>Simulation integration: The system will integrate a small library of different models to be run. </li>
                                <li>Simulation management: The system will allow users to create and manage simulations, including specifying simulation parameters and starting and stopping simulations. </li>
                                <li>Simulation result retrieval: The system will allow users to retrieve simulation results. </li>
                            </ul>
                            </Card.Text>
                            <Button variant="primary" onClick={navigateGitHub}>GitHub</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>                  
            </Container>
        </div>
    )
}

export default About;