import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BankAccountService } from "../services/BankAccountService.js";

// A tool is like an API endpoint that AI agents can call to perform specific actions.
export class GetAccountBalanceTool {
    static register(server: McpServer): void {
        // A tool to retrieve account balance of a customer from the bank
        server.registerTool(
            'get_account_balance',
            {
                title: 'Get XYZ Bank Account Balance',
                description: 'Retrieve the XYZ Bank account balance of a customer',
                inputSchema: { 
                    customer_id: z.string(), 
                    account_number: z.string() 
                },
                outputSchema: { 
                    balance: z.number(),
                    currency: z.string(),
                    account_number: z.string(),
                    customer_id: z.string()
                }
            },
            async ({ customer_id, account_number }) => {
                // Simulate a database call to get the account balance
                const bankAccountService = new BankAccountService();
                const bankBalance = await bankAccountService.getAccountBalance(customer_id, account_number);
                const structuredData = {
                    balance: bankBalance.balance,
                    currency: bankBalance.currency,
                    account_number: bankBalance.account_number,
                    customer_id: bankBalance.customer_id
                };
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Account balance for customer ${customer_id}, account ${account_number}: ${bankBalance.balance} ${bankBalance.currency}`
                        }
                    ],
                    structuredContent: structuredData
                };
            }
        );
    }
}