import React from 'react';
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <main className='container py-12'>
        <h1 className='text-red-500'>Access has been denied</h1>
        <h2>This site is only for logged in users</h2>
        <p>Please, sign-up or log-in with you existing account.</p>

        <h3>Where to go:</h3>
        <ul className='flex flex-col list-inside list-disc'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
    </main>
  )
}

export default AccessDenied;