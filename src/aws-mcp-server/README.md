# AWS MCP Server

A server that connects to AWS accounts similar to AWS CLI.

## Features

- Connect to AWS accounts using credentials
- Support for multiple AWS services
- Credential management similar to AWS CLI
- Profile-based configuration

## Folder Structure

```
src/aws-mcp-server/
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── README.md              # Documentation
├── package.json           # Project dependencies
└── src/                   # Source code
    ├── config/            # Configuration files
    │   └── aws-config.js  # AWS SDK configuration
    ├── core/              # Core functionality (empty for now)
    ├── index.js           # Main entry point
    ├── services/          # AWS service implementations
    │   ├── ec2.js         # EC2 service endpoints
    │   ├── lambda.js      # Lambda service endpoints
    │   └── s3.js          # S3 service endpoints
    └── utils/             # Utility functions
        ├── logger.js      # Logging utility
        └── session-manager.js # AWS session management
```

## Setup

1. Install dependencies:

```
npm install
```

2. Configure AWS credentials:

   - Create a `.env` file based on `.env.example`
   - Or use AWS credentials file at `~/.aws/credentials`

3. Set up Git hooks to prevent committing secrets:
```
./scripts/setup-git-hooks.sh
```

4. Start the server:

```
npm start
```

## Configuration

The server supports multiple ways to configure AWS credentials:

1. Environment variables
2. AWS credentials file (~/.aws/credentials)
3. AWS config file (~/.aws/config)
4. Instance profiles (when running on EC2)

### Temporary Credentials

If you're using temporary AWS credentials (Access Key ID starting with 'ASIA'), make sure to include the session token in your `.env` file:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_SESSION_TOKEN=your_session_token
AWS_REGION=your_region
```

## Security

This project includes several security measures to prevent accidental exposure of credentials:

1. **`.gitignore`**: Configured to exclude `.env` files, keys, certificates, and other sensitive files
2. **Git Hooks**: Pre-commit hook to check for potential secrets in the codebase
3. **Secrets Checker**: Script to scan for potential hardcoded secrets

To run the secrets check manually:
```
./scripts/check-secrets.sh
```

## Usage

The server exposes REST APIs to interact with AWS services:

### S3 Operations
- `GET /api/s3/buckets` - List all S3 buckets
- `GET /api/s3/buckets/:bucket/objects` - List objects in a bucket
- `POST /api/s3/buckets/:bucket/objects` - Upload an object to a bucket
- `DELETE /api/s3/buckets/:bucket/objects/:key` - Delete an object from a bucket

### EC2 Operations
- `GET /api/ec2/instances` - List all EC2 instances
- `GET /api/ec2/instances/:instanceId` - Get EC2 instance details
- `POST /api/ec2/instances/:instanceId/start` - Start an EC2 instance
- `POST /api/ec2/instances/:instanceId/stop` - Stop an EC2 instance

### Lambda Operations
- `GET /api/lambda/functions` - List all Lambda functions
- `GET /api/lambda/functions/:functionName` - Get Lambda function details
- `POST /api/lambda/functions/:functionName/invoke` - Invoke a Lambda function
- `PATCH /api/lambda/functions/:functionName/configuration` - Update Lambda function configuration

### Ways to Interact with the AWS MCP Server:

1. **Using curl from the command line**:
   ```bash
   # List S3 buckets
   curl http://localhost:3000/api/s3/buckets

   # List EC2 instances
   curl http://localhost:3000/api/ec2/instances

   # List Lambda functions
   curl http://localhost:3000/api/lambda/functions
   ```

2. **Using a REST client like Postman**:
   - Set up requests to the endpoints like:
     - GET http://localhost:3000/api/s3/buckets
     - GET http://localhost:3000/api/ec2/instances
     - POST http://localhost:3000/api/lambda/functions/my-function/invoke (with JSON body)

3. **Using a web browser** (for GET requests only):
   - Navigate to http://localhost:3000/health to check if the server is running
   - Navigate to http://localhost:3000/api/s3/buckets to see your S3 buckets

4. **Building a frontend application**:
   - You can create a frontend application that makes API calls to this server
   - This would give you a GUI similar to the AWS Management Console

### Troubleshooting AWS Credentials:

If you're having issues with AWS credentials, here are some options:

1. **For temporary credentials (Access Key starting with ASIA)**:
   - Make sure to include the AWS_SESSION_TOKEN in your .env file
   - These credentials typically expire after a few hours

2. **Use long-term credentials (Access Key starting with AKIA)**:
   - These don't require a session token
   - Be careful with these credentials and never commit them to version control

3. **Use AWS CLI profiles**:
   - If you have AWS CLI configured, you can use a profile:
   ```
   AWS_PROFILE=your-profile-name
   ```
   - Remove the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from .env

4. **Use IAM roles if running on EC2**:
   - If you deploy this to an EC2 instance with an IAM role, you don't need to specify credentials

## Development

```
npm run dev
```

## Testing

```
npm test
```


