import { useState, useEffect } from 'react';
import { parse } from 'papaparse'; // Efficient CSV parsing library
import algeriaCitiesCSV from './algeria_cities.csv';

const useAlgeriaData = () => {
    const [algeriaData, setAlgeriaData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch the CSV data
                const response = await fetch(algeriaCitiesCSV);
                const csvData = await response.text();

                // Parse the CSV data
                const parsedData = parse(csvData, { header: false, delimiter: ',' }); // Adjust 'header' option if necessary
                console.log(parsedData);
                if (parsedData.errors.length > 0) {
                    console.error('Parsing errors:', parsedData.errors); // Log specific errors
                    throw new Error('Error parsing CSV file:', parsedData.errors);
                }

                const formattedData = transformData(parsedData.data);
                console.log(formattedData);
                setAlgeriaData(formattedData);
            } catch (err) {
                console.error('Error parsing Algeria data:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const transformData = (data) => {
        const wilayas = {};

        data.forEach((row) => {
            const wilaya_name_ascii = row[7];
            const daira_name_ascii = row[2];
            if (!wilayas[wilaya_name_ascii]) {
                wilayas[wilaya_name_ascii] = {
                    name: wilaya_name_ascii,
                    dairas: [''], // Initialize communes array here
                };
            }
            if (!wilayas[wilaya_name_ascii].dairas.find((d) => d.name === daira_name_ascii)) {
                wilayas[wilaya_name_ascii].dairas.push({
                    name: daira_name_ascii,
                    communes: [''],
                });
            }


        });

        return Object.values(wilayas); // Convert object to array of wilaya objects
    };


    return { algeriaData, isLoading, error };
};

export default useAlgeriaData;
