import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import * as amplify from '../amplify'; 

function LogIn() {
  // For routing
  let navigate = useNavigate();
  const { route } = useAuthenticator(context => [context.route]);

  useEffect( () => {
    if (route === 'authenticated') {
      navigate("/");
    }
  }, [route])
  
  return (
    <main className='container flex flex-col items-center py-12'>
      <h1>Log In</h1>
      <Authenticator />
    </main>
  )
}

export default LogIn;