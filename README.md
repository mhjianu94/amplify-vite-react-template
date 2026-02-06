# AWS Amplify + Next.js Full-Stack Template

A modern full-stack application template built with AWS Amplify Gen 2 backend and Next.js frontend, featuring authentication, GraphQL API, and DynamoDB integration.

## Project Structure

```
.
├── amplify/              # AWS Amplify backend (Gen 2)
│   ├── backend.ts       # Backend definition
│   ├── auth/            # Authentication configuration
│   └── data/            # GraphQL API and database schema
├── web-app/             # Next.js frontend application
│   ├── app/            # Next.js App Router pages
│   ├── components/      # React components
│   └── lib/            # Utilities and configuration
├── amplify.yml         # Amplify Hosting build configuration
├── docker-compose.yml  # LocalStack configuration
└── package.json        # Root package (backend dependencies)
```

## Features

- **Backend (AWS Amplify Gen 2)**
  - Authentication with Amazon Cognito
  - GraphQL API with AWS AppSync
  - DynamoDB database
  - Type-safe TypeScript definitions

- **Frontend (Next.js)**
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS + shadcn/ui components
  - Real-time data sync with Amplify backend

- **Development Tools**
  - LocalStack for local AWS service emulation
  - Type-safe client generation
  - Hot module replacement

## Quick Start

### Prerequisites

- Node.js >= 20.20.0
- npm >= 10.8.0
- Docker (for LocalStack)
- AWS Account (for deployment)

### Setup

1. **Install dependencies:**
   ```bash
   npm run setup
   ```

2. **Configure AWS credentials:**
   ```bash
   npx ampx configure profile default
   ```

3. **Deploy backend to AWS:**
   ```bash
   npm run backend:deploy
   ```
   This will create your Amplify backend and generate `amplify_outputs.json`.

4. **Sync outputs to frontend:**
   ```bash
   npm run sync-outputs
   ```

5. **Start frontend development server:**
   ```bash
   npm run frontend:dev
   ```

## Available Scripts

### Root Level

- `npm run setup` - Install all dependencies (root + frontend)
- `npm run backend:deploy` - Deploy Amplify backend
- `npm run backend:delete` - Delete sandbox environment
- `npm run frontend:dev` - Start Next.js dev server
- `npm run frontend:build` - Build Next.js for production
- `npm run frontend:install` - Install frontend dependencies
- `npm run sync-outputs` - Copy amplify_outputs.json to web-app/public

### LocalStack Scripts

- `npm run localstack:start` - Start LocalStack container
- `npm run localstack:stop` - Stop LocalStack container
- `npm run localstack:logs` - View LocalStack logs
- `npm run localstack:status` - Check LocalStack health
- `npm run localstack:reset` - Reset LocalStack (removes all data)

## Backend Development

The backend is defined in the `amplify/` directory:

- `amplify/backend.ts` - Main backend definition
- `amplify/auth/resource.ts` - Cognito authentication setup
- `amplify/data/resource.ts` - GraphQL schema and DynamoDB models

After modifying backend code, redeploy:
```bash
npm run backend:deploy
npm run sync-outputs
```

## Frontend Development

The frontend is a Next.js application in `web-app/`:

- Uses App Router (`app/` directory)
- Type-safe with generated Amplify types
- Configured to use `amplify_outputs.json` from `public/` directory

## LocalStack (Optional)

For local development without AWS, you can use LocalStack. See [LOCALSTACK.md](LOCALSTACK.md) for detailed setup instructions.

## Deployment

### Backend

The backend is deployed using Amplify Gen 2:
```bash
npm run backend:deploy
```

### Frontend

The frontend is configured for Amplify Hosting via `amplify.yml`. Push to your connected Git repository and Amplify will automatically build and deploy.

## Configuration

- **Backend outputs**: `amplify_outputs.json` (generated after backend deployment)
- **Frontend config**: `web-app/lib/amplify-config.ts`
- **Build config**: `amplify.yml`

## Security

- Authentication uses AWS Cognito
- API uses API Key authentication (can be upgraded to Cognito)
- All AWS resources follow least-privilege principles

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
