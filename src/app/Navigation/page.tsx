"use client"

import NavigationData from '@/components/NavigationData'
import React, { useEffect, useState } from 'react'

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { DefaultStorageManagerExample } from '../../components/uploadbutton';
import  FileList  from '../../components/list'
import { getCurrentUser, GetCurrentUserOutput } from 'aws-amplify/auth';

const page = () => {
  const [user, setUser] = useState<GetCurrentUserOutput>();
  const getCurrentUserAsync = async () => {
    const result = await getCurrentUser();
    setUser(result);
  };

  useEffect(() => {
    getCurrentUserAsync();
  }, []);

  return (
    <Authenticator>
    {({ signOut, user }) => (
    <main>
      {/* これでメールアドレスはとれる */}
      <h1> Welcome to {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
      <DefaultStorageManagerExample/>
      <FileList/>
      <p>userId: {user?.userId}</p>
      <p>username: {user?.username}</p>
    </main>
           
  )}
  </Authenticator>
  )
}

export default page
