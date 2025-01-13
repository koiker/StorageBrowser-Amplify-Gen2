import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { firstStorage, secondStorage  } from './storage/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  firstStorage,
  secondStorage,
});

const { cfnUserPool } = backend.auth.resources.cfnResources
// an empty array denotes "email" and "phone_number" cannot be used as a username
cfnUserPool.usernameAttributes = []

// Using a specific bucket name for  the default storage
const { cfnBucket: defaultBucket } = backend.firstStorage.resources.cfnResources
defaultBucket.bucketName = 'storagebrowser-koiker-amplify'

// Updating the authenticated IAM role to support S3 Access Grants
const statement = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ["s3:ListCallerAccessGrants", "s3:GetDataAccess"],
  resources: ["arn:aws:s3:us-east-1:109881088269:access-grants/default"],
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(statement);
