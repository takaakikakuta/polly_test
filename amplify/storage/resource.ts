import { defineStorage } from "@aws-amplify/backend";
import { convertTextToSpeech } from "../data/resource";

export const storage = defineStorage({
  name: "predictions_gen2",
  access: (allow) => ({
    "public/*": [
      allow.resource(convertTextToSpeech).to(["write"]),
      allow.guest.to(["read", "write"]),
    ],
    'picture-submissions/*': [
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read', 'write'])
    ]
  }),
});

export const template_models = defineStorage({
  name: "template_models",
  access: (allow) => ({
    "template_models/{entity_id}/*": [
      allow.guest.to(['read']),
      allow.authenticated.to(["read", "write", "delete"])
    ],
    'picture-submissions/*': [
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read', 'write'])
    ]
  }),
});