import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <h2 className='text-2xl font-bold my-8'>Edit Interpretation</h2>
    <form action="" className='flex gap-3 flex-col '>
        <input type="text" name='term' placeholder='Term' className='py-1 px-4 border rounded-md'></input>
   <textarea name='interpretation' rows={4} placeholder='interpretation' className='py-1 px-4 border rounded-md resize-none '>
   </textarea>
   <button className='bg-green-500 mt-5 px-4 py-1 rounded-md cursor-pointer'>
    Update interpretation
   </button>
   <Link className='bg-blue-600 rounded-full w-20 px-4 py-2 items-center justify-between' href="/">Home</Link>
    </form>
    </div>
  )
}

export default page