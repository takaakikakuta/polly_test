"use client"

import React, { useEffect, useRef } from 'react'

import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";

Amplify.configure(outputs);

import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../../amplify/data/resource";
import { getUrl } from "aws-amplify/storage";
import { useState } from "react";

const client = generateClient<Schema>();

const page = () => {
    const [roomdatas, setRoomdatas] = useState<Schema["RoomData"]["type"][]>([]);
  
    useEffect(() => {
        const sub = client.models.RoomData.observeQuery().subscribe({
          next: ({ items }) => {
            setRoomdatas([...items]);
          },
          
        });

        return () => sub.unsubscribe();
      }, []);
  
    return (
    <div>
      {roomdatas.map(({ id, templateName }) => (
            
                <li key={id} className='flex space-x-5 my-4'>
                    <p className="p-2">{templateName}</p>
                </li>
                
        ))}
    </div>
  )
}

export default page
