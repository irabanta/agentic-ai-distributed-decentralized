import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GetAccountBalanceTool } from './GetAccountBalanceTool.js';

/** Manage all tools */
export class ToolBootstrap {
    static instance: ToolBootstrap;

    /**Bootstrap to register all tools */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new ToolBootstrap();
        return this.instance.registerTools(server);
    }
    protected async registerTools(_server: McpServer): Promise<void> {
        // Register tool implementations here
        return new Promise((resolve) => {
            GetAccountBalanceTool.register(_server);
            //TODO: Add more tools here

            resolve();
        });
    }
}