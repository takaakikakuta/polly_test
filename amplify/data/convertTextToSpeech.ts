import { Schema } from "./resource";
import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
} from "@aws-sdk/client-polly";
import { env } from "$amplify/env/convertTextToSpeech";

export const handler: Schema["convertTextToSpeech"]["functionHandler"] = async (
  event
) => {
  const client = new PollyClient();
  const task = new StartSpeechSynthesisTaskCommand({
    OutputFormat: "mp3",
    SampleRate: "8000",
    Text: event.arguments.text,
    TextType: "text",
    VoiceId: "Takumi",
    OutputS3BucketName: env.PREDICTIONS_GEN_2_BUCKET_NAME,
    OutputS3KeyPrefix: "public/",
  });
  const result = await client.send(task);

  return (
    result.SynthesisTask?.OutputUri?.replace(
      "https://s3.ap-northeast-1.amazonaws.com/" +
        env.PREDICTIONS_GEN_2_BUCKET_NAME +
        "/public/",
      ""
    ) ?? ""
  );
};