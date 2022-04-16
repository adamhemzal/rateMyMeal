import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import * as amplify from '../amplify'; 

function SignUp() {
  // For routing
  let navigate = useNavigate();
  const { route } = useAuthenticator(context => [context.route]);

  useEffect( () => {
    if (route === 'authenticated') {
      navigate("/");
    }
  }, [route])

  return (
    <main className='container py-12 flex flex-col items-center'>
        <h1>Sign Up</h1>
        <Authenticator />
    </main>
  )
}

export default SignUp;