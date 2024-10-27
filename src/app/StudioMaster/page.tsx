"use client"

import React, { useEffect, useState } from 'react'
import { ProjectDataCreateForm } from '../../../ui-components'

import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';

import { generateClient } from 'aws-amplify/api';

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";

import type { Schema } from "../../../amplify/data/resource";

Amplify.configure(outputs);


const client = generateClient<Schema>();


const page = () => {
  const [user, setUser] = useState<Schema["UsersResponse"]["type"]>();

  const getUserListAsync = async () => {
    const { data, errors } = await client.queries.listUsers();    
    
    if (data?.users) {
      setUser(data);
    }
  };

  useEffect(() => {
    getUserListAsync();
  }, []);  

  console.log(user);
  

  return (
    <div>
       <p>テンプレートを作成する</p>
       <a href="/StudioMaster/RoomDataCreate">RoomDataを作成する</a>
       <p>ユーザー一覧</p>
       {user?.users?.map((user) => (
        <li key={user?.Username}>
          {user?.Email}
          <ul>
            {user?.Groups?.map((group) => (
              <li key={group}>{group}</li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  )
}

export default page
 