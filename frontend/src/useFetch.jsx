
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (initialURL, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, params) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}` // Include JWT token in headers
        },
        params // Include the nodes as query parameters
      };
      const response = await axios.get(url, config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect (() => {
    fetchData(initialURL, params);
  }, []);

  const refetch = (url, params) => {
    fetchData(url, params)
  }

  return { data, loading, error, refetch };
}

export default useFetch;