import { Stack } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration, Cors } from 'aws-cdk-lib/aws-apigateway';

/**
 * REST API definition using API Gateway and Lambda
 * This creates a REST API Gateway connected to the todos Lambda function
 * @see https://docs.amplify.aws/gen2/build-a-backend/api/rest/
 */
export const api = (backend: any) => {
  // Get the Lambda function from the backend
  // Access the function via the resource name (the key matches what you pass to defineBackend)
  const todosLambdaResource = (backend.resources as any).todosHandler;
  const todosLambda = todosLambdaResource?.resources?.lambda;

  // Create REST API Gateway
  const restApi = new RestApi(backend.stack, 'TodosApi', {
    restApiName: 'TodosService',
    description: 'REST API for Todo operations',
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key'],
    },
  });

  // Create /todos resource
  const todos = restApi.root.addResource('todos');
  todos.addMethod('GET', new LambdaIntegration(todosLambda));
  todos.addMethod('POST', new LambdaIntegration(todosLambda));

  // Create /todos/{id} resource
  const todo = todos.addResource('{id}');
  todo.addMethod('GET', new LambdaIntegration(todosLambda));
  todo.addMethod('PUT', new LambdaIntegration(todosLambda));
  todo.addMethod('PATCH', new LambdaIntegration(todosLambda));
  todo.addMethod('DELETE', new LambdaIntegration(todosLambda));

  // Output the API endpoint for the frontend
  backend.addOutput({
    custom: {
      todos_api: {
        endpoint: restApi.url,
        region: Stack.of(backend.stack).region,
      },
    },
  });
};

