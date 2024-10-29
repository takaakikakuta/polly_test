"use client"

import React, { useEffect, useState } from 'react'

import { generateClient } from "aws-amplify/data";
import { fetchAuthSession } from "aws-amplify/auth";
import type { Schema } from "../../../amplify/data/resource";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>({
    headers: async (requestOptions) => {
        const session = await fetchAuthSession();
        return {
            'Authorization': session.tokens?.idToken?.toString() || '',
        };
    }
    
});

console.log(client);


const page = () => {
    const [mapDatas, setMapDatas] = useState<Schema["MapData"]["type"][]>([]);

    const fetchTodos = async () => {
        const { data: items, errors } = await client.models.MapData.list({authMode: 'userPool'});
        setMapDatas(items);
      };

    useEffect(() => {
        fetchTodos();
    }, []);
  

  return (
    <Authenticator>
    {({ signOut, user }) => (
    <main>
      {/* これでメールアドレスはとれる */}
      <h1> Welcome to {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
      <ul>
        {mapDatas.map(({ id, templateName }) => (
            
                <li key={id}>
                    <p>{templateName}</p>
                </li>
                
        ))}
      </ul>
    </main>
           
  )}
  </Authenticator>
  )
}

export default page
