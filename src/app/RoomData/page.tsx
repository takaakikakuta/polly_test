"use client"

import React, { useState } from 'react'

import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import outputs from '../../../amplify_outputs.json';

import { RoomDataCreateForm } from '../../../ui-components';

import { uploadData } from 'aws-amplify/storage';


Amplify.configure(outputs);

const page = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (file) { // file が undefined でないことを確認
      uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      })
      alert(`${file.name}がアップロードされました。`)
  } else{
    alert(`ファイルが選択されていません。`)
  }; 
}

  return (
    <div>
    <input type="file" onChange={handleChange} />
      <button
        onClick={handleUpload}>
      Upload
    </button>
  </div>
  )
}

export default page
