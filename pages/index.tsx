import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import ActivityCard from '../components/ActivityCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  adress: string;
}

const HomePage : React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const data = await response.json();

        if (Array.isArray(data)) {
          setActivities(data);
        } else {
          setError("Invalid data format");
        }

      } catch (error) {
        console.error("Error fetching activities:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Activities</h1>
          <Link
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/CRUD/add"
          >
            Create New
          </Link>
        </div>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="py-2 flex justify-between w-full">
              <span>
                <strong>{activity.name}</strong> - {activity.description}
              </span>
              <span className="flex gap-2">
                <Link className="text-blue-700 underline hover:no-underline" href={`/${activity.id}/edit`}>Edit</Link>
                <Link className="text-red-500 underline hover:no-underline" href={`/${activity.id}/delete`}>Delete</Link>
              </span>
            </li>
          ))}
          {activities.length === 0 && <div className="py-2">No data</div>}
        </ul>
      </div>
      <Link href="/login">
      <button className="mr-2">Login</button>
      </Link>
      <Link href="/signup">
      <button className="mr-2">Sign up</button>
      </Link>
      <Head>
        <title>Activity</title>
      </Head>
    </>
  );
};

export default HomePage;
