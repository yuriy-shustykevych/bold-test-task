import './index.css';
import React, { useState, useEffect } from 'react';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [voteId, setVoteId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLaoding] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/rating', { signal: abortController.signal });
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const data = await response.json();
        setRating(Math.round(data.value));
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Error fetching rating:', error);
          setError('Could not load rating. Please try again later.');
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [rating]);

  useEffect(() => {
    try {
      const storedVoteId = localStorage.getItem('voteId');
      if (storedVoteId) setVoteId(storedVoteId);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = async (value) => {
    setIsLoading(true);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(true), 3000);

    try {
      const payload = { value, voteId };
      const response = await fetch('127.0.0.1:3000/api/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Failed to post: ${response.statusText}`);
      const data = await response.json();
      localStorage.setItem('voteId', { id: data.voteId });
      setVoteId(data.voteId);
      setRating(value);
    } catch (error) {
      console.error('Error posting rating:', error);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='rating'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        [...Array(5)].map((_, index) => {
          const key = index + 1;
          return (
            <button
              type='button'
              key={key}
              className={`starButton ${key <= (hoverRating || rating) ? 'on' : 'off'}`}
              onClick={() => handleClick(key)}
              onMouseOver={() => handleMouseOver(key)}
              onMouseLeave={handleMouseLeave}
              disabled={isButtonDisabled}
            >
              <span className='star'>&#9733;</span>
            </button>
          );
        })
      )}
    </div>
  );
};

export default Rating;
