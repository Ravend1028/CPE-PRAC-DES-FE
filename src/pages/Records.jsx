import React from 'react'
import { useEffect, useState } from 'react'

const Records = () => {

  const [records, setRecords] = useState([]);

  useEffect( () => {
    const fetchRecords = async () => {
      const url = "http://localhost:3000/person";

      try {
        const response = await fetch(url, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        // setRecords(json);
        console.log(json)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecords();
  }, []);

  return (
    <main>
      <div className="container mx-auto p-6 flex justify-center items-center">
        Test
      </div>
    </main>
  )
}

export default Records