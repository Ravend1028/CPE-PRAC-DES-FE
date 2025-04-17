import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Settings = () => {
  const options = [
    'Change Username', 'Change Password', 'Delete Account'
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
  };

  return (
    <main className='font-poppins'>
      <div className="container mx-auto p-6 space-y-5">
        <div className='flex flex-row justify-center items-center space-x-5'>
          <div className='flex justify-center items-center w-full bg-amber-500 p-2 rounded-md text-md text-slate-950'>
            Use the dropdown below to select an operation related to your account settings.
          </div>
        </div> 

        <Dropdown options={ options } onChange={ handleSelect } value={ selectedOption } placeholder="Select an option" />
      </div>
    </main>
  )
}

export default Settings