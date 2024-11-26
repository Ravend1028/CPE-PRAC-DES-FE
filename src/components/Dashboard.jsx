import React from 'react'
import PersonDetails from './PersonDetails'

const Dashboard = () => {
  return (
    <main>
      <div className="container mx-auto p-6 flex flex justify-center items-center">
        <div className='grid grid-cols-4 gap-4'>
          <PersonDetails />

          <p>
            Talagang papahirapan pa bago mag noche buena e no??
          </p>
        </div>


      </div>
    </main>
  )
}

export default Dashboard