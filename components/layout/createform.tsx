'use client';
import { useState } from 'react';

const CreatePostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/createPost', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    // Check the response status and text for debugging
    console.log('Response status:', response.status);

    if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost);
        setTitle('');
        setContent('');
      } else {
        console.error('Error:', response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
