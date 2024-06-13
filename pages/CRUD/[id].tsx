import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Footer from '../../components/Footer';

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  adress: string;
}

const ActivityDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await fetch(`/api/activities`);
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
    <>
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>{activity.date}</p>
      <p>{activity.time}</p>
      <p>{activity.adress}</p>
      <Link href={`/CRUD/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={async () => {
        await fetch(`/api/activities`, { method: 'DELETE' });
        router.push('/');
      }}>Delete</button>
    </div>
    <Footer/>
    </>
  );
};

export default ActivityDetailPage;
