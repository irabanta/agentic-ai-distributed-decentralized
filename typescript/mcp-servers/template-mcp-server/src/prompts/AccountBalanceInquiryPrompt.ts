import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class AccountBalanceInquiryPrompt {
    static register(server: McpServer): void {
        // Prompt with context-aware completion
        server.registerPrompt(
            'bank_balance_inquiry_prompt',
            {
                title: 'XYZ Bank Account Balance Inquiry',
                description: `Inquire about the account balance for a specific customer and account number at XYZ Bank.
                Ask for missing info customer_id or account_number if not provided. Once fulfilled, 
                call the 'get_account_balance' tool to retrieve the balance.`,
                argsSchema: {
                    customer_id: z.string(),
                    account_number: z.string()
                }
            },
            ({ customer_id, account_number }) => ({
                messages: [
                    {
                        role: 'user',
                        content: {
                            type: 'text',
                            text: `Please provide the account balance for customer ID: ${customer_id} and account number: ${account_number} at XYZ Bank.`
                        }
                    }
                ]
            })
        );
    }
}