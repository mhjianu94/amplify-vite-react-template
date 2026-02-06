import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { todosHandler } from './function/todos/resource';
import { api } from './api/resource';

const backend = defineBackend({
  auth,
  todosHandler,
});

// Add REST API Gateway using CDK
api(backend);
