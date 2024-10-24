"use client"

import React, { useState, useEffect } from 'react';
import { list } from 'aws-amplify/storage';
import { StorageImage } from '@aws-amplify/ui-react-storage';

const FileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await list({
          path: 'picture-submissions/'
        });
        console.log(result.items);
        
        setFiles(result.items); 
      } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            setError(err.message); // エラーメッセージにアクセス
          } else {
            console.error("An unknown error occurred");
            setError("An unknown error occurred");
          }
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>File List</h1>
      {error && <p>Error fetching files: {error}</p>}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <StorageImage alt={file.lastModified} path={file.path} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;