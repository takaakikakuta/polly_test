"use client"

import React, { useEffect } from 'react'

import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";

Amplify.configure(outputs);

import { generateClient } from "aws-amplify/api";
import { data, type Schema } from "../../../../amplify/data/resource";
import { getUrl } from "aws-amplify/storage";
import { useState } from "react";
import { useParams } from 'next/navigation';
import { ItemBatcher } from 'aws-cdk-lib/aws-stepfunctions';


const client = generateClient<Schema>();

type PollyReturnType = Schema["convertTextToSpeech"]["returnType"];

const page = () => {
  const { id } = useParams(); // パラメータを取得
  const [navi, setNavi] = useState<Schema["Navigation"]["type"]>();
  const [srcUrl, setSrcUrl] = useState<{ [key: string]: string }>({});

  const getNavigation = async () => {
    if (typeof id === 'string') {
      const { data: item, errors } = await client.models.Navigation.get({
        id,
      });
      setNavi(item ? item : undefined)
    }    
  };

  useEffect(() => {
    getNavigation();
  }, []);

  useEffect(() => {
    const fetchUrls = async () => {
      const urls: { [key: string]: string } = {}; // 型を指定
     
        if (navi?.src) {  // srcが存在するか確認
          try {
            const res  = await getUrl({ path: navi.src });
            urls[navi.id] = res.url.toString();
          } catch (error) {
            console.error("Error fetching URL:", error);
          }
        } else {
          console.warn(`No src provided for navi with id ${navi?.id}`);
        }
  
      setSrcUrl(urls);
      console.log(urls);
    };
    fetchUrls();
    
  }, [navi]);


  console.log(navi);
  
    

  return (
    <div className='container mx-auto mt-10'>
      <p>Navigationの編集</p>
      {
        navi ?(
          <>
            <div>
              <p>テキスト</p>
              <p>{navi.text}</p>
            </div>
            <a href={srcUrl[navi.id]}>再生</a>
          </>
        ) 
        :""
      }
      
    </div>
  )
}

export default page
