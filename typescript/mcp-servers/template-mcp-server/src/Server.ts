import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import express from 'express';

// Import Zod extensions to initialize prototype methods
import '@daaif/mcp-common';

import { getServerConfig } from './config/config.js';
import { ToolBootstrap } from './tools/bootstrap.js';
import { ResourcesBootstrap } from './resources/bootstrap.js';
import { PromptsBootstrap } from './prompts/bootstrap.js';
import { McpServerBootstrap } from './mcpserver/bootstrap.js';
import { AccountBalanceBootstrap } from './account-balance/bootstrap.js';

async function startServer() {
    // Set up Express and HTTP transport
    const app = express();
    app.use(express.json());

    // Create an MCP server with enterprise configuration
    const config = getServerConfig();
    const server = new McpServer({
        name: config.name,
        version: config.version
    });

    try {
        // Register all tools
        await ToolBootstrap.bootstrap(server);

        // Register all resources
        await ResourcesBootstrap.bootstrap(server);

        // Register all prompts
        await PromptsBootstrap.bootstrap(server);

        /** Register functionality wise */
        await AccountBalanceBootstrap.bootstrap(server);

        // Start the MCP server with express transport
        await McpServerBootstrap.bootstrap(server, app);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});