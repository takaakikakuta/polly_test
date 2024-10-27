import { env } from "$amplify/env/list-users"
import type { Schema } from "../resource"
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["listUsers"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {
  const command = new ListUsersCommand({ UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID });


  const response = await client.send(command)

  console.log(response);  
  
  const Users: Schema['UsersResponse']['type'] = {
    users:
      response.Users?.map((user) => {
        return {
          Username: user.Username || '',
          UserStatus: user.UserStatus || '',
          UserCreateDate: user.UserCreateDate?.toISOString() || '',
          UserLastModifiedDate: user.UserLastModifiedDate?.toISOString() || '',
          Enabled: user.Enabled || false,
          Email: user.Attributes?.find(attr => attr.Name === "email")?.Value || '',
          Groups: user.Attributes?.find(attr => attr.Name === "cognito:groups")?.Value?.split(",") || [],
          Attributes:
            user.Attributes?.map((attribute) => {
              return {
                Name: attribute.Name || '',
                Value: attribute.Value || '',
              };
            }) || [],
        };
      }) || [],
  };

  return Users;
}