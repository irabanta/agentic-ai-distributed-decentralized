# MCP Servers

This directory contains multiple Model Context Protocol (MCP) servers, each serving a specific purpose in the distributed AI system.

## Server Template Reference

The `server-template-mcp-server` folder contains a complete working MCP server implementation that can be used as a reference for creating new MCP servers. This template demonstrates best practices and includes basic configurations for quick start.

## Development

Each MCP server can be run independently in development mode. To start a specific server:

1. Navigate to the desired server directory:
   ```bash
   cd <server-name>-mcp-server
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Available MCP servers:
- ap2-payment-mcp-server
- credit-score-mcp-server
- document-store-mcp-server
- loan-process-mcp-server
- queue-mcp-server
- rule-engine-mcp-server
- server-template-mcp-server

## Production Build and Deployment

To prepare and run a server in production:

1. Navigate to the server directory:
   ```bash
   cd <server-name>-mcp-server
   ```

2. Build the server:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

The production build will create optimized JavaScript files in the `dist` directory and start the server with production configurations.