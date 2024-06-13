import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Head from 'next/head';
//import styles from '../../styles/AddActivityPage.module.css'; // Importing CSS module

const AddActivityPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [adress, setAdress] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, date, time, adress }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <Head>
        <title>Add Activity</title>
      </Head>
      <div className={"container"}>
        <h1 className={"title"}>Add a New Activity</h1>
        <form onSubmit={handleSubmit} className={"form"}>
          <label className={"label"}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={"input"}
            />
          </label>
          <label className={"label"}>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={"input"}
            />
          </label>
          <label className={"label"}>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={"input"}
            />
          </label>
          <label className={"label"}>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={"input"}
            />
          </label>
          <label className={"label"}>
            Address:
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              required
              className={"input"}
            />
          </label>
          <button type="submit" className={"button"}>
            Add Activity
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddActivityPage;
