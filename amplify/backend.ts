import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { todosHandler } from './function/todos/resource';
// Temporarily disabled: API Gateway setup causes Docker bundling error in CI/CD
// import { api } from './api/resource';

const backend = defineBackend({
  auth,
  todosHandler,
});

// TODO: Re-enable API Gateway once Docker bundling issue is resolved
// The Lambda function will deploy successfully without the API Gateway
// You can create the API Gateway manually in AWS Console and connect it to the Lambda
// api(backend);
