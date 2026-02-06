import { defineFunction } from '@aws-amplify/backend';

/**
 * Lambda function for Todo operations
 * @see https://docs.amplify.aws/gen2/build-a-backend/functions/
 */
export const todosHandler = defineFunction({
  name: 'todos-handler',
  entry: './handler.ts',
});

