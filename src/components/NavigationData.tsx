"use client"

import React, { useEffect, useState } from 'react'

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

const NavigationData = () => {
    const [text, setText] = useState(""); // フォーム入力の文字列
    const [navis, setNavis] = useState<Schema["Navigation"]["type"][]>([]);


    const fetchTodos = async () => {
        const { data: items, errors } = await client.models.Navigation.list();
        setNavis(items);
      };

    const handleSave = async () => {
        // 保存処理（例：APIコールなど）をここに記述
        await client.models.Navigation.create({
            text: text,
          })
    
        // テキストフィールドをクリア
        setText('');

        fetchTodos();
      };

      useEffect(() => {
        fetchTodos();
      }, []);

      
    const deleteNavi = (id:string) =>{
        client.models.Navigation.delete({id})
    }



  return (
    <div className='container mx-auto mt-10'>
      <div className="flex flex-col">
        <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // 入力値をセット
        placeholder="Enter text to synthesize"
        className="border p-2 mb-4"
        />
        <div className='mx-auto'>
            <button className='bg-green-300 rounded-lg w-auto p-2' onClick={handleSave}>保存</button>
        </div>
      </div>
      <ul>
        {navis.map(({ id, text }) => (
            
                <li key={id}>
                    <p>{text}</p>
                    <button onClick={()=>deleteNavi(id)}>削除</button>
                </li>
                
        ))}
      </ul>
    </div>
  )
}

export default NavigationData
