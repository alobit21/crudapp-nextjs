'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}
const page = () => {
  const [isLoading, setIsLoading]= useState(true);
  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{ 
    const fetchInterpretations=async()=>{
    setIsLoading(true);
    try{
      const response = await fetch('/api/intepretations');
      if (!response.ok){
        throw new Error("Failed to fetch interpretations")
      }
      const data = await response.json();
      setInterpretations(data);
    } catch (error) {
      console.log("Error: ", error);
      setError("Failed to Fetch data. Please try again");
    } finally {
      setIsLoading(false);
    }
  };
  fetchInterpretations();
  }, [])

  const handleDelete = async(id: string) => {
    try{
      await fetch(`/api/intepretations/${id}`,{method: "DELETE"});
setInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id !== id));
    } catch (error){
      setError("Failed to delete interpretations. Please try again")
    }
  };
  return (
    <div>
      {error && <p className='py-4 text-red-500'>{error}</p>}
      {isLoading? (
        <p>Loading Interpretations...</p>
      ): interpretations?.length > 0 ? (
        <div>
          {
            interpretations?.map(interpretation => (
              <div key = {interpretation.$id} className='p-4 my-2 rounded-md border-b leading-8'>

 <div className="font-bold">
{interpretation.term}
      </div>
      <div>
        {interpretation.interpretation}
        </div>
        <div className='flex gap-4 mt-4 justify-end'>
     <Link className='bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest'
      href={`/edit/${interpretation.$id}`}>Edit</Link>
    <button
    onClick={()=> handleDelete(interpretation.$id)}
    className='bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest'>
delete
    </button>
    
    </div>
</div>
            ))
          }
     
    </div>
    ): (
      <p>No interpretation found</p>
    )}
      </div>
  );
}

export default page

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
