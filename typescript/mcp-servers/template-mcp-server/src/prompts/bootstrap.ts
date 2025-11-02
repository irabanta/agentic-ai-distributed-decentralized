
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AccountBalanceInquiryPrompt } from './AccountBalanceInquiryPrompt.js';

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
            AccountBalanceInquiryPrompt.register(_server);
            //TODO: Add more prompts here

            resolve();
        });
    }
}   