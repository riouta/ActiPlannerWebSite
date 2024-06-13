import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useSession, signIn } from 'next-auth/react';

const HomePage : React.FC = () => {
  const { data: session } = useSession();
  

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     try {
  //       const response = await fetch("/api/activities/read_create");
  //       const data = await response.json();

  //       if (Array.isArray(data)) {
  //         setActivities(data);
  //       } 
  //       // else {
  //       //   setError("Invalid data format");
  //       // }

  //     } catch (error) {
  //       console.error("Error fetching activities:", error);
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  //   //const token = localStorage.getItem('token');
    
  //   if (session) {
  //     fetchActivities();
  //   }
  // }, [session]);

  // if (loading) {
  //   return <div className="spinner">Loading</div>;
  // }

  return (
    <>
      <Header />
      <Head>
        <title>Activity</title>
      </Head>

      <div className="container">
      <h1 >Welcome to ActiPlanner</h1>
      <p >Your one-stop solution to plan and manage activities efficiently.</p> 
        <div className="image-container">
          <img src="/images/calendar.png" alt="Calendar" />
        </div>
        
      </div>          
      <div className="flex mt-4">
        <Link href="/login" passHref legacyBehavior>
          <button>Login</button>
        </Link>
        <Link href="/signup" passHref legacyBehavior>
          <button>Sign up</button>
        </Link>
      </div>
        <Footer /> 
  </>
  );
};

export default HomePage;
