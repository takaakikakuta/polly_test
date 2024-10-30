import type { Schema } from "../resource"
import { env } from "$amplify/env/add-user-to-group"
import {
  AdminAddUserToGroupCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["addUserToGroup"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {
  const { userId, groupName } = event.arguments
  const command = new AdminUpdateUserAttributesCommand({
    Username: userId,
    // GroupName: groupName,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    UserAttributes: [
      {
        Name: 'custom:tenant_id', // 更新するカスタム属性の名前
        Value: userId           // カスタム属性にコピーするID
      },
    ],
  })
  const response = await client.send(command)
  return response
}