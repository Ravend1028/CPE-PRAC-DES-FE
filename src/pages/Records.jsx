import React from 'react';
import { useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import RecordsTable from '../components/RecordsTable';
import { useNavigate } from 'react-router';

const Records = () => {

  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

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

  const handleRecordClick = (id) => {
    navigate(`/records/${ id }`);
  };

  // If functional programming is a must, then consider separating the anonymous function in button event handler
  // into a separate stand alone function, that calls the handleRecordClick() function

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/person/${ id }`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Record deleted successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the record.');
    }
  }

  // Add form event handler upon submission

  return (
    <main className='relative flex justify-center items-center'>
      <div className="container mx-auto p-6 flex justify-center items-center">
        <RecordsTable>
          { records.map((record) => (
            <tr key = { record.id } className = { record.id % 2 == 1 ? 'bg-slate-300 cursor-pointer hover:bg-slate-400' : 'cursor-pointer hover:bg-slate-400' } onClick = { () => { handleRecordClick(record.id) } }>
              <td className="border-r border-slate-950 p-2 text-center">{ record.name }</td>
              <td className="border-r border-slate-950 p-2 text-center">{ record.age }</td>
              <td className="border-r border-slate-950 p-2 text-center">{ record.gender }</td>
              <td className="border-r border-slate-950 p-2 text-center">{ record.phone }</td>
              <td className="border-r border-slate-950 p-2 text-center">{ record.email }</td>
              <td className="border-r border-slate-950 p-2 flex justify-center space-x-3">
                <button className='bg-gray-950 text-gray-200 rounded-md p-3'>
                  <MdModeEdit />
                </button>

                <button className='bg-red-800 text-gray-200 rounded-md p-3'>
                  <MdDelete onClick = { (e) => { 
                                e.stopPropagation(); 
                                handleDeleteRecord( record.id );
                                location.reload(); } } />
                </button>
              </td>
            </tr>
          )) }
        </RecordsTable>
      </div>

      <div className="container mx-auto p-6 absolute z-10 bg-gray-950 text-white w-1/2 rounded-md">
        {/* Insert form here / form layout */}
        {/* Name | Age | Gender | Email | Phone */}
        
        <form>
          <label htmlFor="">

          </label>
          <input type="text" />
        </form>


      </div>
    </main>
  )
}

export default Records