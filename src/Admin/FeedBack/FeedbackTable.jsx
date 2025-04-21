import React from 'react'

function FeedbackTable() {
    const rows = Array.from({ length: 4 });
  return (
    <div className='w-full h-screen bg-white shadow-lg shadow-gray-200 p-5'>
  {/* Optional header or space */}
  <div className='w-full h-20'></div>

  <table className='w-full  border-2 rounded-md border-slate-300 '>
    <thead className='border-b-2 border-gray-300 ro'>
      <tr className=''>
        <th className='p-3 text-center'>User Name</th>
        <th className='p-3 text-center'>Message</th>
        <th className='p-3 text-center'>Rating</th>
        <th className='p-3 text-center'>Order-id</th>
        <th className='p-3 text-center'>Vendor name</th>
      </tr>
    </thead>
    <tbody>
      <tr className='border-b border-slate-300'>
        <td className='p-4 text-center'>
          <span className='mx-auto'>Adithya Karmarkar</span>
        </td>
        <td className='p-4 w-40 text-center'>
          Adithya Karmarkar is good addfjsjfsjfkjskfdddkdkfjdjfjdfjdjfj
        </td>
        <td className='p-4 text-center'>5 Stars</td>
        <td className='p-4 text-center'>ORD123456</td>
        <td className='p-4 text-center'>Vendor XYZ</td>
      </tr>
      <tr className='border-b border-slate-300'>
        <td className='p-4 text-center'>
          <span className='mx-auto'>Adithya Karmarkar</span>
        </td>
        <td className='p-4 w-40 text-center'>
          Adithya Karmarkar is good addfjsjfsjfkjskfdddkdkfjdjfjdfjdjfj
        </td>
        <td className='p-4 text-center'>5 Stars</td>
        <td className='p-4 text-center'>ORD123456</td>
        <td className='p-4 text-center'>Vendor XYZ</td>
      </tr>
     
     {
        rows.map((ele)=>(
            <tr className='border-b border-slate-300'>
            <td className='p-4 text-center'>
              <span className='mx-auto'>Adithya Karmarkar</span>
            </td>
            <td className='p-4 w-40 text-center'>
              Adithya Karmarkar is good addfjsjfsjfkjskfdddkdkfjdjfjdfjdjfj
            </td>
            <td className='p-4 text-center'>5 Stars</td>
            <td className='p-4 text-center'>ORD123456</td>
            <td className='p-4 text-center'>Vendor XYZ</td>
          </tr>
            
        ))
     }
     
        
     
    </tbody>
  </table>
</div>

  )
}

export default FeedbackTable