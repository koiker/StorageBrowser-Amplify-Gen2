import * as s3 from 'aws-cdk-lib/aws-s3';
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
