import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PromptLoader } from "@daaif/mcp-common";

export class AccountBalanceInquiryPrompt {
    private static promptLoader = PromptLoader.getInstance(
        './src/prompts/templates/prompts.yaml'
    );
    static BANK_BALANCE_INQUIRY_PROMPT: string = 'bank_balance_inquiry_prompt';

    static register(server: McpServer): void {
        const promptLoader = this.promptLoader;
        const promptKey = this.BANK_BALANCE_INQUIRY_PROMPT;
        const template = promptLoader.getPrompt(promptKey);
        
        // Prompt with context-aware completion
        server.registerPrompt(
            promptKey,
            {
                title: template.title,
                description: template.description,
                argsSchema: {
                    customer_id: z.string().xRequired("customer_id").xUserMustInput().xLength(6),
                    account_number: z.string().xRequired("account_number").xUserMustInput().xLength(10)
                }
            },
            async (args: { customer_id: string; account_number: string }) => {
                const template = promptLoader.getPrompt(promptKey);
                
                // Consume YAML template here
                const messageText = promptLoader.renderMessage(
                    template.user_message,
                    {
                        customer_id: args.customer_id,
                        account_number: args.account_number
                    }
                );
                
                return {
                    messages: [
                        {
                            role: 'user' as const,
                            content: {
                                type: 'text' as const,
                                text: messageText
                            }
                        }
                    ]
                };
            }
        );
    }
}