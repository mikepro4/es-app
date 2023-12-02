import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { keyDown, keyUp } from '@/redux';

const KeyboardListener = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key is a letter, Shift, Escape, or Space
      if (event.key.match(/^[a-zA-Z]$/) || event.key === 'Shift' || event.key === 'Escape' || event.key === ' ') {
        dispatch(keyDown(event.key === ' ' ? 'SPACE' : event.key.toUpperCase()));
      }
    };

    const handleKeyUp = (event) => {
      if (event.key.match(/^[a-zA-Z]$/) || event.key === 'Shift' || event.key === 'Escape' || event.key === ' ') {
        dispatch(keyUp(event.key === ' ' ? 'SPACE' : event.key.toUpperCase()));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default KeyboardListener;
