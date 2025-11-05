
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/** Manage all prompts */
export class PromptsBootstrap {
    static instance: PromptsBootstrap;

    /**Bootstrap to register all prompts */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new PromptsBootstrap();
        return this.instance.registerPrompts(server);
    }
    protected async registerPrompts(_server: McpServer): Promise<void> {
        // TODO:Register general prompts implementations here
        return Promise.resolve();
    }
}   