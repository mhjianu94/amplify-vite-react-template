import type { Handler } from 'aws-lambda';

// Note: For DynamoDB integration, you'll need to:
// 1. Install @aws-sdk/client-dynamodb and @aws-sdk/lib-dynamodb in the function's package.json
// 2. Or use Amplify's storage resource which provides DynamoDB access
// For now, using a simple in-memory store for demonstration

// In-memory store (replace with DynamoDB in production)
const todos: Record<string, { id: string; content: string; createdAt: string }> = {};

// Get table name from environment (will be set by Amplify if using DynamoDB)
// For now using in-memory store - replace with DynamoDB when ready
// In Lambda, process.env is available at runtime
const TABLE_NAME = 'Todo'; // Will be set via environment variable in production

/**
 * Lambda handler for Todo REST API endpoints
 * This handler processes API Gateway REST API requests
 */
export const handler: Handler = async (event) => {
  // API Gateway event structure
  const { httpMethod, path, pathParameters, body, requestContext } = event;

  // Parse the path to determine the endpoint
  const route = path.split('/').filter(Boolean);
  const resource = route[route.length - 1]; // e.g., 'todos' or a todo ID

  try {
    switch (httpMethod) {
      case 'GET':
        if (pathParameters?.id) {
          // GET /todos/{id} - Get a specific todo
          return getTodo(pathParameters.id);
        } else {
          // GET /todos - List all todos
          return listTodos();
        }

      case 'POST':
        // POST /todos - Create a new todo
        return createTodo(JSON.parse(body || '{}'));

      case 'PUT':
      case 'PATCH':
        // PUT/PATCH /todos/{id} - Update a todo
        if (!pathParameters?.id) {
          return errorResponse(400, 'Todo ID is required');
        }
        return updateTodo(pathParameters.id, JSON.parse(body || '{}'));

      case 'DELETE':
        // DELETE /todos/{id} - Delete a todo
        if (!pathParameters?.id) {
          return errorResponse(400, 'Todo ID is required');
        }
        return deleteTodo(pathParameters.id);

      default:
        return errorResponse(405, `Method ${httpMethod} not allowed`);
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    return errorResponse(500, error.message || 'Internal server error');
  }
};

// Helper functions for Todo operations
// TODO: Replace with actual DynamoDB operations
// Install @aws-sdk/client-dynamodb and @aws-sdk/lib-dynamodb in function/package.json

async function listTodos() {
  // For now, using in-memory store
  // Replace with DynamoDB ScanCommand when SDK is installed
  return successResponse(Object.values(todos));
}

async function getTodo(id: string) {
  const todo = todos[id];
  if (!todo) {
    return errorResponse(404, 'Todo not found');
  }
  return successResponse(todo);
}

async function createTodo(data: { content: string }) {
  const newTodo = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    content: data.content,
    createdAt: new Date().toISOString(),
  };
  todos[newTodo.id] = newTodo;
  return successResponse(newTodo, 201);
}

async function updateTodo(id: string, data: { content?: string }) {
  const todo = todos[id];
  if (!todo) {
    return errorResponse(404, 'Todo not found');
  }
  if (data.content !== undefined) {
    todo.content = data.content;
  }
  return successResponse(todo);
}

async function deleteTodo(id: string) {
  if (!todos[id]) {
    return errorResponse(404, 'Todo not found');
  }
  delete todos[id];
  return successResponse({ message: `Todo ${id} deleted` }, 200);
}

// Response helpers
function successResponse(data: any, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    },
    body: JSON.stringify(data),
  };
}

function errorResponse(statusCode: number, message: string) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: message }),
  };
}

