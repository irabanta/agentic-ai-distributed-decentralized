
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MyCustomPrompt } from './MyCustomPrompt.js';

/** Manage all prompts */
export class PromptsBootstrap {
    static instance: PromptsBootstrap;

    /**Bootstrap to register all prompts */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new PromptsBootstrap();
        return this.instance.registerPrompts(server);
    }
    protected async registerPrompts(_server: McpServer): Promise<void> {
        // Register prompts implementations here
        return new Promise((resolve) => {
            MyCustomPrompt.register(_server);
            //TODO: Add more prompts here

            resolve();
        });
    }
}   