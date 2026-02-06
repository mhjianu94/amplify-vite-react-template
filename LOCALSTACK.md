# LocalStack Setup for Local Development

This project uses [LocalStack](https://localstack.cloud/) to emulate AWS services locally for development and testing.

## Prerequisites

- Docker and Docker Compose installed
- Node.js >= 20.20.0
- npm >= 10.8.0

## Quick Start

1. **Start LocalStack:**
   ```bash
   npm run localstack:start
   ```

2. **Verify LocalStack is running:**
   ```bash
   npm run localstack:status
   ```

3. **Deploy your Amplify backend to LocalStack:**
   ```bash
   npx ampx sandbox --profile localstack
   ```

4. **Start your frontend:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run localstack:start` - Start LocalStack container
- `npm run localstack:stop` - Stop LocalStack container
- `npm run localstack:logs` - View LocalStack logs
- `npm run localstack:status` - Check LocalStack health status
- `npm run localstack:reset` - Reset LocalStack (removes all data)
- `npm run dev:localstack` - Start LocalStack and frontend dev server

## Configuration

### Environment Variables

LocalStack uses the following environment variables (configured in `docker-compose.yml`):

- `AWS_ACCESS_KEY_ID=test`
- `AWS_SECRET_ACCESS_KEY=test`
- `AWS_SESSION_TOKEN=test`
- `AWS_DEFAULT_REGION=us-east-1`
- `LOCALSTACK_ENDPOINT=http://localhost:4566`

### AWS CLI Configuration

To use AWS CLI with LocalStack, create or update `~/.aws/config`:

```ini
[profile localstack]
region = us-east-1
output = json
```

And `~/.aws/credentials`:

```ini
[localstack]
aws_access_key_id = test
aws_secret_access_key = test
aws_session_token = test
```

Then use LocalStack with:
```bash
aws --endpoint-url=http://localhost:4566 --profile localstack <command>
```

## Services Enabled

The following AWS services are emulated:

- **Cognito IDP** - User authentication
- **AppSync** - GraphQL API
- **DynamoDB** - NoSQL database
- **Lambda** - Serverless functions
- **IAM** - Identity and Access Management
- **STS** - Security Token Service
- **CloudFormation** - Infrastructure as Code
- **API Gateway** - REST/HTTP APIs
- **CloudWatch Logs** - Logging

## Amplify Integration

### Using Amplify Sandbox with LocalStack

Amplify Gen 2 supports LocalStack through the sandbox command. Configure it to use LocalStack endpoints:

1. **Set up AWS credentials for LocalStack:**
   ```bash
   export AWS_ACCESS_KEY_ID=test
   export AWS_SECRET_ACCESS_KEY=test
   export AWS_SESSION_TOKEN=test
   export AWS_DEFAULT_REGION=us-east-1
   ```

2. **Configure Amplify to use LocalStack:**
   Create or update `amplify/backend-config.json`:
   ```json
   {
     "customEndpoint": "http://localhost:4566",
     "useLocalStack": true
   }
   ```

3. **Deploy to LocalStack:**
   ```bash
   npx ampx sandbox
   ```

### Frontend Configuration

Update your frontend to use LocalStack endpoints. In your Amplify configuration:

```typescript
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Override endpoints for local development
const config = {
  ...outputs,
  Auth: {
    ...outputs.Auth,
    Cognito: {
      ...outputs.Auth?.Cognito,
      // Override with LocalStack endpoint if in development
      endpoint: import.meta.env.DEV 
        ? 'http://localhost:4566' 
        : undefined
    }
  },
  API: {
    ...outputs.API,
    GraphQL: {
      ...outputs.API?.GraphQL,
      endpoint: import.meta.env.DEV
        ? 'http://localhost:4566/graphql'
        : outputs.API?.GraphQL?.endpoint
    }
  }
};

Amplify.configure(config);
```

## Data Persistence

LocalStack data is persisted in the `.localstack` directory (gitignored). To reset all data:

```bash
npm run localstack:reset
```

## Troubleshooting

### LocalStack won't start

1. Check if Docker is running:
   ```bash
   docker ps
   ```

2. Check if port 4566 is already in use:
   ```bash
   lsof -i :4566
   ```

3. View LocalStack logs:
   ```bash
   npm run localstack:logs
   ```

### Services not available

1. Verify LocalStack is healthy:
   ```bash
   npm run localstack:status
   ```

2. Check that required services are enabled in `docker-compose.yml`

3. Restart LocalStack:
   ```bash
   npm run localstack:stop
   npm run localstack:start
   ```

### Amplify deployment issues

1. Ensure LocalStack is running before deploying
2. Check that environment variables are set correctly
3. Verify AWS credentials are configured for LocalStack profile

## Resources

- [LocalStack Documentation](https://docs.localstack.cloud/)
- [Amplify Gen 2 Documentation](https://docs.amplify.aws/gen2/)
- [LocalStack GitHub](https://github.com/localstack/localstack)

