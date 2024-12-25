import React from 'react'

const FormData = () => {
  return (
    <section>
      <div className='border-b-2 border-gray-950 flex justify-center items-center p-6'>
        <form>
          <div className='flex space-x-8'>
            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Name: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Age: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Gender: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Email: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Phone: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>
          </div>

          {/* Add Vital Statistics Here */}


        </form>
      </div>
    </section>
  )
}

export default FormData