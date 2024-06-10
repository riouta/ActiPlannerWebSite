import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";

const AddActivityPage = () => {
  const router = useRouter();
  const [activity, setActivity] = useState({
    name: "",
    description: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/activities", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
      if (response.ok) {
        router.push('/');
      } else {
        // Handle error response from the server
        console.error('Failed to create activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Create activity</h1>
        </div>
        <form>
          <div className="mb-4">
            <label>Name</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="name"
              value={activity?.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="description"
              value={activity?.description}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleSubmit}
          >
            Create activity
          </button>
        </form>
      </div>
      <Head>
        <title>Create activity</title>
      </Head>
    </>
  );
};

export default AddActivityPage;
