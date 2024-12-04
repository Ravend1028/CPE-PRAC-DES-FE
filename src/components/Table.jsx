import React from 'react'

const Table = ({ children }) => {
  return (
    <main>
      <table className='table-auto border border-slate-950 font-poppins text-slate-950 w-[1200px]'>
        <caption class="caption-top font-bold text-3xl mb-5">
          MOCK RECORDS
        </caption>

        <thead>
          <tr>
            <th className='border border-slate-950 p-2'>Name</th>
            <th className='border border-slate-950 p-2'>Age</th>
            <th className='border border-slate-950 p-2'>Gender</th>
            <th className='border border-slate-950 p-2'>Email</th>
            <th className='border border-slate-950 p-2'>Number</th>
            <th className='border border-slate-950 p-2'>Actions</th>
          </tr>
        </thead>

       <tbody>
        { children }
       </tbody>
      </table>
    </main>
  )
}

export default Table