import React from 'react';
import { useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Table from '../components/Table';

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
        setRecords(json);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecords();
  }, []);

  return (
    <main>
      <div className="container mx-auto p-6 flex justify-center items-center">
        <Table>
          {records.map((record) => (
            <tr key = { record.id } className = { record.id % 2 == 1 ? 'bg-gray-300' : '' }>
              <td className="border-r border-slate-950 p-2">{ record.name }</td>
              <td className="border-r border-slate-950 p-2">{ record.age }</td>
              <td className="border-r border-slate-950 p-2">{ record.gender }</td>
              <td className="border-r border-slate-950 p-2">{ record.phone }</td>
              <td className="border-r border-slate-950 p-2">{ record.email }</td>
              <td className="border-r border-slate-950 p-2 flex justify-center space-x-3">
                <button className='bg-slate-950 text-gray-200 rounded-md p-3'>
                  <MdModeEdit />
                </button>

                <button className='bg-red-800 text-gray-200 rounded-md p-3'>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </main>
  )
}

export default Records