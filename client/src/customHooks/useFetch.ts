import axios from 'axios';
import { useEffect, useState } from 'react';

interface ResponseInterface { data: Object };

const useFetch = (url: string, options: Object) => {
    const [data, setData]: [Object | null, Function] = useState(null);
    const [isLoading, setIsLoading]: [Boolean | null, Function] = useState(true);
    const [error, setError]: [string | null, Function] = useState(null);

    useEffect(() => {
        const fetchData: Function = async () => {
            try {
                setIsLoading(true);
                const response: ResponseInterface = await axios(url, options);
                // console.log(response);
                setData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, isLoading, error };
}

export default useFetch;