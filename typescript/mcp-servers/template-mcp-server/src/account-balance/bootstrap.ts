import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GetAccountBalanceTool } from './tools/GetAccountBalanceTool.js';
import { AccountBalanceInquiryPrompt } from './prompts/AccountBalanceInquiryPrompt.js';

/** Manage MCP of AccountBalance */
export class AccountBalanceBootstrap {
    static instance: AccountBalanceBootstrap;

    /**Bootstrap to register all tools */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new AccountBalanceBootstrap();
        await GetAccountBalanceTool.register(server);
        await AccountBalanceInquiryPrompt.register(server);
    }
}