# MCP Server Template

This is an enterprise-grade Model Context Protocol (MCP) server template implementation in TypeScript, designed for deployment in Kubernetes environments with service mesh integration.

## Prerequisites

- Node.js >= 18.x
- npm >= 18.x
- TypeScript >= 5.x

## Installation

```bash
# Clone the repository
git clone https://github.com/irabanta/distributed-decentralized-agentic-ai-mcp.git

# Navigate to the server template directory
cd typescript/mcp-servers/server-template-mcp

# Install dependencies
npm install
```

## Environment Variables

The server uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

### Required Environment Variables

```env
SERVICE_NAME=your-mcp-service-name     # Name of your MCP service
SERVICE_VERSION=1.0.0                  # Version of your service
NODE_ENV=development                   # Environment (development/staging/production)
```
## Development

```bash
# Start the server in development mode
npm run dev

# Build the project
npm run build

# Run tests
npm test

# Start in production mode
npm start
```