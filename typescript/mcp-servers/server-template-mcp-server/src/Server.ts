import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import express from 'express';

import { getServerConfig } from './config/config.js';
import { ToolBootstrap } from './tools/bootstrap.js';
import { ResourcesBootstrap } from './resources/bootstrap.js';
import { PromptsBootstrap } from './prompts/bootstrap.js';
import { McpServerBootstrap } from './mcpserver/bootstrap.js';

// Set up Express and HTTP transport
const app = express();
app.use(express.json());

// Create an MCP server with enterprise configuration
const config = getServerConfig();
const server = new McpServer({
    name: config.name,
    version: config.version
});

// Register all tools
await ToolBootstrap.bootstrap(server);

// Register all resources
await ResourcesBootstrap.bootstrap(server);

// Register all prompts
await PromptsBootstrap.bootstrap(server);

// Start the MCP server with express transport
await McpServerBootstrap.bootstrap(server, app);