'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/intepretations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create interpretation");
      }

      // Reset form fields after successful submission
      setFormData({ term: "", interpretation: "" });
      router.push("/");
    } catch (error) {
      console.error("Something went wrong:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold my-8'>Add New Interpretation</h2>
      <form onSubmit={handleSubmit} className='flex gap-3 flex-col'>
        <input
          type="text"
          name='term'
          placeholder='Term'
          value={formData.term}
          className='py-1 px-4 border rounded-md'
          onChange={handleInputChange}
        />
        <textarea
          name='interpretation'
          rows={4}
          placeholder='Interpretation'
          value={formData.interpretation}
          className='py-1 px-4 border rounded-md resize-none'
          onChange={handleInputChange}
        />
        <button 
          type='submit'
          disabled={isLoading}
          className='bg-green-500 mt-5 px-4 py-1 rounded-md cursor-pointer'
        >
          {isLoading ? "Adding..." : "Add Interpretation"}
        </button>
      </form>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
}

export default Page;
