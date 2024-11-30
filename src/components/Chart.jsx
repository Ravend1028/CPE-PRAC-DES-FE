import React from 'react';

const Chart = ({ parameter, children }) => {
  // Clone the child element and pass the `parameter` prop
  const clonedChild = React.Children.map(children, child =>
    React.cloneElement(child, { parameter })
  );

  return (
    <div className='border-2 border-black p-3 rounded-md font-poppins flex flex-col justify-center items-center space-y-3 bg-slate-950 text-gray-200'>
      <h3 className='font-bold text-xl'>
       { parameter }
      </h3>

      <div>
        { clonedChild }
      </div>
    </div>
  )
}

export default Chart