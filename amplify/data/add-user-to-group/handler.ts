import type { Schema } from "../resource"
import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  AdminAddUserToGroupCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["addUserToGroup"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: event.userPoolId,
    Username: event.userName,
    // GroupName: groupName,
    UserAttributes: [
      {
        Name: 'custom:tenant_id', // 更新するカスタム属性の名前
        Value: event.userName           // カスタム属性にコピーするID
      },
    ],
  })
  const response = await client.send(command)
  return response
}