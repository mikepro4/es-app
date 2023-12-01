// components/KeyboardListener.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { keyDown, keyUp } from '@/redux';

const KeyboardListener = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Use a regular expression to check if the key is a letter
      if (event.key.match(/^[a-zA-Z]$/)) {
        dispatch(keyDown(event.key.toUpperCase()));
      }
    };

    const handleKeyUp = (event) => {
      if (event.key.match(/^[a-zA-Z]$/)) {
        dispatch(keyUp(event.key.toUpperCase()));
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
