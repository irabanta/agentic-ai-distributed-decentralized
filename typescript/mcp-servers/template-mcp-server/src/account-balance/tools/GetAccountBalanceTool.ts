import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
// Import Zod extensions to ensure they're loaded before use
import "@daaif/mcp-common";
import { BankAccountService } from "../services/BankAccountService.js";
import { zodStrLength, zodStrRequired, zodStrUserMustInput } from "@daaif/mcp-common";

// A tool is like an API endpoint that AI agents can call to perform specific actions.
export class GetAccountBalanceTool {
    static register(server: McpServer): void {
        server.registerTool(
            'get_account_balance',
            {
                title: 'Get XYZ Bank Account Balance',
                description: 'Retrieve the XYZ Bank account balance of a customer. CRITICAL: This tool should ONLY be called after you have obtained BOTH customer_id and account_number directly from the user. Do NOT call this tool with placeholder, example, or mock values like "CUST001" or "ACC123456". If you do not have real user-provided values, ask the user for them first.',
                inputSchema: { 
                    customer_id: zodStrLength(zodStrUserMustInput(zodStrRequired(z.string(), "customer_id")), 6),
                    account_number: zodStrLength(zodStrUserMustInput(zodStrRequired(z.string(), "account_number")),10)
                },
                outputSchema: { 
                    balance: z.number(),
                    currency: z.string(),
                    account_number: z.string(),
                    customer_id: z.string()
                }
            },
            GetAccountBalanceTool.executeToolHandler
        );
    }

    static async executeToolHandler(args: {customer_id: string, account_number: string}): 
        Promise<{
            content: Array<{type: "text"; text: string}>;
            structuredContent: { 
                balance: number; 
                currency: string; 
                account_number: string; 
                customer_id: string 
            };
        }> {
        // Validate inputs
        if (!args.customer_id || args.customer_id.trim() === '') {
            throw new Error('customer_id is required and cannot be empty');
        }
        if (!args.account_number || args.account_number.trim() === '') {
            throw new Error('account_number is required and cannot be empty');
        }
        
        // Simulate a database call to get the account balance
        const bankAccountService = new BankAccountService();
        const bankBalance = await bankAccountService.getAccountBalance(args.customer_id, args.account_number);
               
        return {
            content: [
                {
                    type: 'text' as const,
                    text: `Account balance for customer ${args.customer_id}, account ${args.account_number}: ${bankBalance.balance} ${bankBalance.currency}`
                }
            ],
            structuredContent: bankBalance
        };
    }
}