import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminAddUserToGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { env } from '$amplify/env/post-confirmation';

const client = new CognitoIdentityProviderClient();

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  const command = new AdminUpdateUserAttributesCommand({
    // GroupName: env.GROUP_NAME,
    Username: event.userName,
    UserPoolId: event.userPoolId,
    UserAttributes: [
      {
        Name: 'custom:tenant_id', // 更新するカスタム属性の名前
        Value: event.userName     // カスタム属性にコピーするID
      },
    ],
  });
  const response = await client.send(command);
  console.log('processed', response.$metadata.requestId);
  return event;
};