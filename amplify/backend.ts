import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { todosHandler } from './function/todos/resource';

defineBackend({
  auth,
  todosHandler,
});
