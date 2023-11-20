
import React from 'react';
import { useRouter } from 'next/router'
import Button from "../../components/button";

const TestView = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Welcome to the Test View!</h1>
      <p>This is a basic React view.</p>
      <Button
        label="Login"
        small={true}
        minimal={true}
        onClick={() => {
          router.push("/auth/login")
        }}
      />
    </div>
  );
};

export default TestView;
