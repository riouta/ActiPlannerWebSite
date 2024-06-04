import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Activity {
  id: string;
  name: string;
  description: string;
}

const ActivityDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await fetch(`/api/activities/${id}`);
          const data = await response.json();
          setActivity(data);
        } catch (error) {
          console.error('Error fetching activity:', error);
        }
      };

      fetchActivity();
    }
  }, [id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <Link href={`/activities/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={async () => {
        await fetch(`/api/activities/${id}`, { method: 'DELETE' });
        router.push('/activities');
      }}>Delete</button>
    </div>
  );
};

export default ActivityDetailPage;
