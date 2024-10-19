"use client"

import React from 'react'

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { getUrl } from "aws-amplify/storage";
import { useState } from "react";

const client = generateClient<Schema>();

type PollyReturnType = Schema["convertTextToSpeech"]["returnType"];

const Polly = () => {
    const [src, setSrc] = useState("");
    const [file, setFile] = useState<PollyReturnType>("");
    return (
      <div className="flex flex-col">
        <button
          onClick={async () => {
            const { data, errors } = await client.mutations.convertTextToSpeech({
              text: "Hello World!",
            });            
  
            if (!errors && data) {
              setFile(data);
            } else {
              console.log(errors);
            }
          }}
        >
          Synth
        </button>
        <button
          onClick={async () => {
            const res = await getUrl({
              path: "public/" + file,
            });
  
            setSrc(res.url.toString());
            console.log(src);
            
          }}
        >
          Fetch audio
        </button>
        <a href={src}>Get audio file</a>
      </div>
    );
}

export default Polly
