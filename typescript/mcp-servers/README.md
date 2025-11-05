# MCP Servers

This directory implements a **monorepo structure** for Model Context Protocol (MCP) servers, each serving a specific purpose in the distributed AI system.

## Key Structural Components

### Common Package (`common/`)
The `@daaif/mcp-common` package provides shared utilities across all MCP servers:
- **Zod Extensions**: Custom validation methods for enhanced schema definitions
- **Prompt Loader**: Centralized YAML-based prompt management
- Shared types and interfaces for consistency

### Template Server (`template-mcp-server/`)
A complete, production-ready reference implementation demonstrating:
- **Prompts**: AI interaction entry points with parameter validation
- **Resources**: Static reference information for AI context
- **Tools**: Business logic implementation with service integration
- Enterprise-grade configuration and deployment patterns

## Development

### Initial Setup

1. Build the common package first (required):
   ```bash
   cd common
   npm install
   npm run build
   cd ..
   ```

### Running Individual Servers

Each MCP server can be run independently in development mode:

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

4. To run in stdio protocol
   ```bash
   $env:MCP_TRANSPORT="stdio"; npx tsx src\Server.ts
   ```

### Available MCP Servers

**Infrastructure:**
- `common` - Shared utilities package
- `template-mcp-server` - Reference implementation

**Domain Services:**
- `ap2-payment-mcp-server` - Payment processing and AP2 protocol integration
- `credit-score-mcp-server` - Credit scoring and risk assessment
- `document-store-mcp-server` - Document management and verification
- `loan-process-mcp-server` - Loan application workflow
- `queue-mcp-server` - Message queue management
- `rule-engine-mcp-server` - Business rules evaluation

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

## How to configure in Claude Desktop?

Goto the profile icon on left botton of the Claude Desktop and then goto settings -> Developer.

Edit the config json for MCP Servers. Below is one working sample which can be modified for all mcp-servers

```json
{
  "mcpServers": {
    "template-mcp-server": {
      "command": "npx",
      "args": [
        "tsx",
        "d:\\personal\\projects\\agentic-ai-distributed-decentralized\\typescript\\mcp-servers\\template-mcp-server\\src\\Server.ts"
      ],
      "env": {
        "MCP_TRANSPORT": "stdio"
      }
    }
  }
}
```