"use client"

import React, { useEffect, useRef } from 'react'

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { getUrl } from "aws-amplify/storage";
import { useState } from "react";
import { CfnDataflowEndpointGroup } from 'aws-cdk-lib/aws-groundstation';

const client = generateClient<Schema>();

type PollyReturnType = Schema["convertTextToSpeech"]["returnType"];

const Polly = () => {
    const [text, setText] = useState(""); // フォーム入力の文字列
    const [src, setSrc] = useState("");
    const [file, setFile] = useState<PollyReturnType>("");
    const [navis, setNavis] = useState<Schema["Navigation"]["type"][]>([]);
    const [srcUrls, setSrcUrls] = useState<{ [key: string]: string }>({});
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleSave = async () => {
      await client.models.Navigation.create({
        text,
        src:"public/" + file,
      })
      setText("")
      setSrc("")     
      
    }

    useEffect(() => {
      const sub = client.models.Navigation.observeQuery().subscribe({
        next: ({ items }) => {
          setNavis([...items]);
        },
        
      });
      console.log(navis);
      return () => sub.unsubscribe();
    }, []);

    useEffect(() => {
      const fetchUrls = async () => {
        const urls: { [key: string]: string } = {}; // 型を指定
        for (const navi of navis) {
          if (navi.src) {  // srcが存在するか確認
            try {
              const res  = await getUrl({ path: navi.src });
              urls[navi.id] = res.url.toString();
            } catch (error) {
              console.error("Error fetching URL:", error);
            }
          } else {
            console.warn(`No src provided for navi with id ${navi.id}`);
          }
        }
        setSrcUrls(urls);
        console.log(urls);
      };
      fetchUrls();
      
    }, [navis]);


    const deleteNavi = (id:string) =>{
      client.models.Navigation.delete({id})
    }

    const playAudio = (src: string) => {
      if (audioRef.current) {
        // audioRef.currentにsrcを直接設定
        audioRef.current.src = src;
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    };

    return (
      <div className="flex flex-col">
        <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // 入力値をセット
        placeholder="Enter text to synthesize"
        className="border p-2 mb-4"
      />
        <button
          onClick={async () => {
            // 1. convertTextToSpeechの実行
            const { data, errors } = await client.mutations.convertTextToSpeech({
              text,
            });

            if (!errors && data) {
              // dataを保存して毎回getUrlで生成だな
              setFile(data);

              // 2. 変換後のファイルが取得できたら、そのURLを取得
              const res = await getUrl({
                path: "public/" + data,
              });

              setSrc(res.url.toString());
              console.log(res.url.toString());
            } else {
              console.log(errors);
            }
          }}
        >
          音声の作成
        </button>
        {/* <a className="mx-auto" href={src}>試聴する</a> */}
        <button onClick={()=>playAudio(src)}>試聴する</button>
      {src && (
        <audio ref={audioRef} controls className='hidden'>
          <source src={src} type="audio/mpeg" />
        </audio>
      )}
        <button 
            onClick={handleSave}>保存</button>
        <ul>
        {navis.map(({ id, text }) => (
        <li key={id} className="flex space-x-5 my-4 border-2 items-center">
          <p className="p-2">{text}</p>
          <a
            onClick={() => playAudio(srcUrls[id])}
            className="p-2 bg-blue-300"
          >
            再生
          </a>
          {srcUrls[id] && (
            <audio ref={audioRef} controls className="hidden">
              <source src={srcUrls[id]} type="audio/mpeg" />
            </audio>
          )}
          <a href={`NavigationEdit/${id}`} className="p-2 bg-yellow-300">
            編集
          </a>
          <a
            className="p-2 bg-red-300"
            onClick={() => deleteNavi(id)}
          >
            削除
          </a>
        </li>
      ))}
      </ul>
      </div>
    );
}

export default Polly
