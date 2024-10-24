"use client"

import NavigationData from '@/components/NavigationData'
import React from 'react'

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { DefaultStorageManagerExample } from '../../components/uploadbutton';
import  FileList  from '../../components/list'

const page = () => {
  return (
    <Authenticator>
    {({ signOut, user }) => (
    <main>
      <h1> Welcome to {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
      <DefaultStorageManagerExample/>
      <FileList/>
    </main>       
  )}
  </Authenticator>
  )
}

export default page
