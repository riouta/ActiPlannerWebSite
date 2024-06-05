import React from 'react';
import Link from 'next/link';
import ActivityCard from '../components/ActivityCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const activities = [
    { id: 1, title: 'Activity 1', description: 'Description for Activity 1' },
   // { id: 2, title: 'Activity 2', description: 'Description for Activity 2' },
   // { id: 3, title: 'Activity 3', description: 'Description for Activity 3' }
  ];

  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to ActiPlanner</h1>
        <p>Explore our activities or sign in to access exclusive features.</p>
        <div>
          {activities.map(activity => (
            <ActivityCard key={activity.id} title={activity.title} description={activity.description} />
          ))}
        </div>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
