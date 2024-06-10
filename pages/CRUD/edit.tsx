import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";

interface Activity {
  id: string;
  name: string;
  description: string;
}

const EditActivityPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState<Activity>({
    id: '',
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await fetch(`/api/activities/${id}`);
          const data: Activity = await response.json();
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

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
      router.push(`/activities/${id}`);
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
          <h1 className="text-3xl font-semibold">Edit Activity</h1>
        </div>
        <form onSubmit={handleUpdate}>
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
            <textarea
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              name="description"
              value={activity.description}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      <Head>
        <title>Edit Activity</title>
      </Head>
    </>
  );
};

export default EditActivityPage;
