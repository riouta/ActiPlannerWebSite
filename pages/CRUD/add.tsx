import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
//import Head from "next/head";
import Footer from '../../components/Footer';

const AddActivityPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activity, setActivity] = useState({
    name: "",
    description: "",
    date: "", 
    time: "", 
    adress: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!session) {
      setErrorMessage('You must be logged in to create an activity');
      return;
    }

    try {
      const response = await fetch("/api/activities/read_create", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
      if (response.ok) {
        setSuccessMessage("Activity has been added");
        setActivity({
          name: "",
          description: "",
          date: "", 
          time: "", 
          adress: "",
      });
      setErrorMessage(null);
      window.location.href = '/CRUD/[id]';
      }
      else {
        // Handle error response from the server
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create activity');
        setSuccessMessage(null);
        //console.error('Failed to create activity:', response.statusText);
      }
    } catch (error) {
      //console.error('Error creating activity:', error);
      setErrorMessage('Error creating activity');
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Add an activity</h1>
        </div>
        <form>
          <div className="mb-4">
            <label>Name</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="name"
              value={activity.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="description"
              value={activity.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Date</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="date"
              name="date"
              value={activity.date}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Time</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="time"
              name="time"
              value={activity.time}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Adress</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="adress"
              value={activity.adress}
              onChange={onChange}
            />
          </div>
        </form>
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddActivityPage;
