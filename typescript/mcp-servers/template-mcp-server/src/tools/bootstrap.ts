import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/** Manage all tools */
export class ToolBootstrap {
    static instance: ToolBootstrap;

    /**Bootstrap to register all tools */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new ToolBootstrap();
        return this.instance.registerTools(server);
    }
    protected async registerTools(_server: McpServer): Promise<void> {
        // TODO: Register general tool implementations here
        return Promise.resolve();
    }
}