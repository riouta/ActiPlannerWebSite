import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const AddActivityPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      router.push('/activities');
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div>
      <h1>Add Activity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
};

export default AddActivityPage;
