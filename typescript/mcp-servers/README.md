# MCP Servers

This directory contains multiple Model Context Protocol (MCP) servers, each serving a specific purpose in the distributed AI system.

## Server Template Reference

The `template-mcp-server` folder contains a complete working MCP server implementation that can be used as a reference for creating new MCP servers. This template demonstrates best practices and includes basic configurations for quick start.

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
- template-mcp-server

## Using MCP Inspector

To inspect and interact with your running MCP server, you can use the MCP Inspector. Ensure the PORT number as per your server configuration! Launch it using the following command:

```bash
npx @modelcontextprotocol/inspector --transport http --endpoint http://localhost:{port}/mcp
```

OR simply start the MCP Inspector and configure any MCP Server URL by yourself.

```bash
npx @modelcontextprotocol/inspector
```

This will open the MCP Inspector in your default browser, allowing you to explore the server's endpoints, test prompts, and debug responses.

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