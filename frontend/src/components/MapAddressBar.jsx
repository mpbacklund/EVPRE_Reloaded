import React, { useState, useEffect, useRef } from 'react';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddressBar = ({ startCoords, endCoords, onRoute, onNewStart, onNewEnd, locationClicked }) => {
    const [startAddress, setStartAddress] = useState("Your location");
    const [endAddress, setEndAddress] = useState('');
    const [fetchingRoute, setFetchingRoute] = useState(false);
    const [vehicle, setVehicle] = useState('');

    const startTextBoxRef = useRef(null);
    const endTextBoxRef = useRef(null);

    const options = {
        "Ford Focus": "FORDFOCUSELECTRIC2012",
        "Cheverolet Spark": "CHEVSPARK2016",
        "Nissan Leaf 24KWH": "NISSANLEAF24KWH2016",
        "Nissan Leaf 30KWH": "NISSANLEAF30KWH2016"
    };

    // update end Location on address bar when new location is clicked on map
    useEffect(() => {
        if (endCoords) {
            getAddress(endCoords.lat, endCoords.lng)
                .then(address => {
                    setEndAddress(address);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        }
    }, [endCoords]);

    useEffect(() => {
        setStartAddress("Your location");
    }, [locationClicked]);

    // When we click on the start location textbox, delete its contents if it is the default location
    const handleStartFocus = () => {
        if (startAddress === "Your location") {
            setStartAddress(''); // Clear start Address when input is focused
        }
    };

    // When we click off of the start location textbox, restore the value to the default if it is blank
    const handleStartBlur = () => {
        if (startAddress === "") {
            setStartAddress('Your location');
            onNewStart(null);
        }
        else {
            addStartMarker();
        }
    }

    // When we click on the end location textbox, delete its contents if it is the default location
    const handleEndFocus = () => {
        if (endAddress === "") {
            setEndAddress(''); // Clear end value when input is focused
        }
    };

    // When we click off of the end location textbox, restore the value to the current pin location if it is blank
    const handleEndBlur = () => {
        if (endAddress === "") {
            getAddress(endCoords.lat, endCoords.lng)
                .then(address => {
                    setEndAddress(address);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        }
        else {
            getCoords(endAddress)
                .then(coords => {
                    onNewEnd(coords);
                })
                .catch(error => {
                    console.error("error fetching coordinates", error);
                });
        }
    }

    // Sets startAddress to be equal to whatever is typed into the start textbox
    const handleStartChange = (e) => {
        setStartAddress(e.target.value);
    };

    const handleStartTextEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default action (e.g., form submission if inside a form)
            // Call your specific action here
            addStartMarker();
            startTextBoxRef.current.blur();
        }
    }

    // handles when 
    const handleEndTextEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default action (e.g., form submission if inside a form)
            // Call your specific action here
            handleEndBlur();
            endTextBoxRef.current.blur();
        }
    }

    // Sets endAddress to be equal to whatever is typed into the end textbox
    const handleEndChange = (e) => {
        setEndAddress(e.target.value);
    };

    // When Submit button is pressed
    const handleSubmit = async () => {
        setFetchingRoute(true);

        const params = {
            'startLat': startCoords.lat,
            'startLon': startCoords.lng,
            'endLat': endCoords.lat,
            'endLon': endCoords.lng,
            'vehicle': vehicle
        };

        const response = await axios.get('http://localhost:8000/getRoute', { params });
        onRoute(response)

        setFetchingRoute(false);
    };

    // gets coordinates from startMarker and sends a request to the map to add a marker in that location
    const addStartMarker = () => {
        getCoords(startAddress)
            .then(coords => {
                onNewStart(coords);
            })
            .catch(error => {
                console.error("error fetching coordinates", error);
            });
    }

    // given a set of coordinates, returns the nearest address
    const getAddress = async (lat, lng) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                return response.data.display_name;
            } else {
                throw new Error('Failed to fetch address');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            return null;
        }
    };

    // given an address, returns the coordinates of that address
    const getCoords = async (address) => {
        const url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + address;
        try {
            const response = await axios.get(url);
            const coords = {'lat': response.data[0].lat, 'lng': response.data[0].lon}
            return coords;
        } catch (error) {
            console.error('error fetching lat lon:', error);
            throw error;
        }
    }

    // changes vehicle selection based on dropdown selection
    const handleVehicleChange = (e) => {
        setVehicle(e.target.value);
    };

    return (
        <div className='address-bar-overlay'>
            <Card>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            id='startLocation'
                            type='text'
                            value={startAddress} 
                            onFocus={handleStartFocus}
                            onChange={handleStartChange}
                            onKeyDown={handleStartTextEnter}
                            onBlur={handleStartBlur}
                            placeholder="Start location"
                            ref={startTextBoxRef}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            id='endLocation'
                            type='text'
                            value={endAddress}
                            onChange={handleEndChange}
                            onKeyDown={handleEndTextEnter}
                            onFocus={handleEndFocus}
                            onBlur={handleEndBlur}
                            placeholder="End Location"
                            ref={endTextBoxRef}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Row className='align-items-center'>
                            <Col xs='auto'>
                                <Form.Select value={vehicle} onChange={handleVehicleChange}>
                                    <option value="">Select a vehicle</option>
                                    {Object.keys(options).map((key) => (
                                        <option key={key} value={options[key]}>
                                            {key}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col xs='auto' className='ml-auto'>
                                <Button 
                                    variant="primary" 
                                    onClick={handleSubmit} 
                                    disabled={fetchingRoute}
                                > 
                                    {fetchingRoute ? <div className='spinner'></div> : "Get Directions"} 
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    );
};

export default AddressBar;
