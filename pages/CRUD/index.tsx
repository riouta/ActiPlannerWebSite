import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Activity {
  id: string;
  name: string;
  description: string;
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities');
        const data: Activity[] = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      <Link href="/activities/add">
        <button>Add Activity</button>
      </Link>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <Link href={`/activities/${activity.id}`}>
              {activity.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesPage;
