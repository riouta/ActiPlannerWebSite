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
    return <div className="spinner">Loading...</div>;
  }

  return (
    <>
    <Head>
      <title>Activity</title>
    </Head>

    <div className="container">
      <h1 >Welcome to ActiPlanner</h1>
      {error && <div className="error-alert">{error}</div>}
      <div className="activity-list">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h2 className="text-3xl font-semibold">Activities</h2>
          <Link href="/CRUD/add">
            <button>Add a new activity</button>
          </Link>
        </div>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="activity-card">
              <span>
                <strong>{activity.name}</strong> - {activity.description}
              </span>
              <div className="flex gap-2 mt-2">
                <Link href={`/${activity.id}/edit`}>Edit</Link>
                <Link  href={`/${activity.id}/delete`}>Delete</Link>
              </div>
            </li>
          ))}
          {activities.length === 0 && <div>No activities available</div>}
        </ul>
      </div>
      <div className="flex mt-4">
        <Link href="/login">
          <button>Login</button>
        </Link>
        <Link href="/signup">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
    <Footer /> 
  </>
  );
};

export default HomePage;
