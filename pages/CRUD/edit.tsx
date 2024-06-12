import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";


const EditActivityPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    date: "",
    time: "",
    adress: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await fetch(`/api/activities`);
          const data = await response.json();
          setActivity(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching activity:', error);
        }
      };

      fetchActivity();
    }
  }, [id]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/activities`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to update activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Edit activity</h1>
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
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditActivityPage;
