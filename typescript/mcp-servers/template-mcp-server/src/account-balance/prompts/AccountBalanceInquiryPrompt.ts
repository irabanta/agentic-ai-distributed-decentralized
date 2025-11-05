import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
// Import Zod extensions to ensure they're loaded before use
import "@daaif/mcp-common";
import { PromptLoader, zodStrLength, zodStrRequired, zodStrUserMustInput } from "@daaif/mcp-common";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class AccountBalanceInquiryPrompt {
    private static promptLoader = PromptLoader.getInstance(
        join(__dirname, '../../prompts/templates/prompts.yaml')
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
                    customer_id: zodStrLength(zodStrUserMustInput(zodStrRequired(z.string(), "customer_id")), 6),
                    account_number:  zodStrLength(zodStrUserMustInput(zodStrRequired(z.string(), "account_number")),10),
                    account_type: z.enum(['savings', 'checking'])
                }
            },
            async (args: { customer_id: string; account_number: string; account_type?: 'savings' | 'checking' }) => {
                const template = promptLoader.getPrompt(promptKey);
                
                // Consume YAML template here
                const messageText = promptLoader.renderMessage(
                    template.user_message,
                    {
                        customer_id: args.customer_id,
                        account_number: args.account_number,
                        account_type: args.account_type || 'savings'
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