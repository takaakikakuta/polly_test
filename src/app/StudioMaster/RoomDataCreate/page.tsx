"use client"

import React from 'react'
import { RoomDataCreateForm } from '../../../../ui-components'

import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';

import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";

Amplify.configure(outputs);

const page = () => {
  return (
    <div>
        <ThemeProvider>
            <RoomDataCreateForm/>
        </ThemeProvider>
    </div>
  )
}

export default page
