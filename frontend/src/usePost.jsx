import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url, jsonData) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    setLoading(True);
    axios.post("http://localhost:8000/" + url, jsonData)
    .then(function (response) {
        console.log(response);
        setData(response);
    })
    .catch(function (error) {
        console.log(error)
    })

    return { data, loading, error };
}

export default useFetch;