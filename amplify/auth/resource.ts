import { defineAuth } from '@aws-amplify/backend';
import {addUserToGroup} from "../data/add-user-to-group/resource";
import {listUsers} from "../data/list-users/resource";


/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups:["ADMINS", "PAIDUSERS","TRIAL"],
  userAttributes: {
    "custom:tenant_id": {
      dataType: "String",
      mutable: true,
    },
  },
  access: (allow) => [
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(listUsers).to(["manageUsers"]),
   ],
});
