import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router';
import RecordsTable from '../components/RecordsTable';

const Records = () => {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const modal = useRef(null);

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
        setLoading(false);

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

  if (!records) {
    return <Spinner loading={ loading } />
  }

  // Add form event handler upon submission

  const handleModalToggle = (id) => {
    console.log(modal);
  
    if (modal.current.classList.contains('hidden')) {
      modal.current.classList.remove('hidden');
    }

  }

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
                  <MdModeEdit onClick={ (e) => {
                    e.stopPropagation();
                    handleModalToggle( record.id );
                  } } />
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

      <div ref={ modal } className="container mx-auto p-6 absolute z-10 text-white w-1/3 rounded-md bg-gray-950 hidden">
        
        <form className='flex flex-col justify-center items-center space-y-2 w-full'>
          <div className="flex flex-col space-y-2">
            <label className='font-bold uppercase' htmlFor="name">
              Name:
            </label>
            <input className='border-x-2 border-amber-500 rounded-md p-2' type="text" name='name' value={''} onChange={''} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className='font-bold uppercase' htmlFor="age">
              Age:
            </label>
            <input className='border-x-2 border-amber-500 rounded-md p-2' type="text" name='age' value={''} onChange={''} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className='font-bold uppercase' htmlFor="gender">
              Gender:
            </label>
            <input className='border-x-2 border-amber-500 rounded-md p-2' type="text" name='gender' value={''} onChange={''} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className='font-bold uppercase' htmlFor="email">
              Email:
            </label>
            <input className='border-x-2 border-amber-500 rounded-md p-2' type="text" name='email' value={''} onChange={''} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className='font-bold uppercase' htmlFor="phone">
              Phone:
            </label>
            <input className='border-x-2 border-amber-500 rounded-md p-2' type="text" name='phone' value={''} onChange={''} />
          </div>

          {/* Button for cancelling the record edit / toggle modal hidden attribute */}
          <input className='mt-8 p-2 rounded-md bg-amber-500 w-1/2' type="submit" />
        </form>

      </div>

    </main>
  )
}

export default Records