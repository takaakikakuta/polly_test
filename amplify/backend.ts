import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, convertTextToSpeech } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import {listUsers} from "./data/list-users/resource";
import { storage } from "./storage/resource";
import * as iam from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
 auth,
 data,
 storage,
 listUsers,
 convertTextToSpeech,
});

backend.convertTextToSpeech.resources.lambda.addToRolePolicy(
 new PolicyStatement({
   actions: ["polly:StartSpeechSynthesisTask"],
   resources: ["*"],
 })
);

const lambdaFunction = backend.listUsers.resources.lambda;
lambdaFunction.role?.attachInlinePolicy(
 new iam.Policy(backend.auth.resources.userPool, "AllowListUsers", {
  statements: [
   new iam.PolicyStatement({
    actions: ["cognito-idp:ListUsers"],
    resources: [backend.auth.resources.userPool.userPoolArn],
  }),
  ],
 })
);

const { cfnUserPool } = backend.auth.resources.cfnResources;
 if (Array.isArray(cfnUserPool.schema)) {
    cfnUserPool.schema.push({
        name: 'tenantId',
        attributeDataType: 'String',
        required: false,
        mutable: true,
    });
}
