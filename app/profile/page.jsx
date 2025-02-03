"use client"

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { getUser, saveCredential } from './actions'

const Profile = ({
  searchParams
}) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const initialize = async () => {
      if (searchParams.message = 'Saved Correctly') {
        saveCredential();
      }
      setUser(await getUser());
    }
    initialize();
  }, [])

  return (
    <>
      {
        user && Object.keys(user).length  ?
          <div className="m-80 flex flex-col gap-4">
            <button className="btn-donate" onClick={() => { signIn('google', { callbackUrl: window.location + '?message=Saved Correctly' }) }}>Sign in with google</button>
            <button className="btn-donate" onClick={() => signIn('slack', { callbackUrl: window.location + '?message=Saved Correctly' })}>Sign in with Slack</button>
          </div>
          :
          <></>
      }
    </>
  )
}

export default Profile;