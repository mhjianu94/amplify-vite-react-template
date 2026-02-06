import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { todosHandler } from './function/todos/resource';
// import { api } from './api/resource';

const backend = defineBackend({
  auth,
  todosHandler,
});

// Note: The Docker bundling issue occurs because CDK tries to use Docker
// for Lambda bundling in CI/CD. This is a known limitation.
// 
// Solutions:
// 1. Add CDK_DOCKER=false to amplify.yml environment variables
// 2. Or configure the function to use esbuild bundling (requires modifyResources)
// 3. Or create API Gateway manually after Lambda deploys
//
// For now, the Lambda will attempt to deploy but may fail due to Docker requirement.
// TODO: Re-enable API Gateway once bundling is confirmed working
// api(backend);
