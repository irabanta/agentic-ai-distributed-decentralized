import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completable } from '@modelcontextprotocol/sdk/server/completable.js';
import { z } from "zod";

export class MyCustomPrompt {
    static register(server: McpServer): void {
        // Prompt with context-aware completion
        server.registerPrompt(
            'team-greeting',
            {
                title: 'Team Greeting',
                description: 'Generate a greeting for team members',
                argsSchema: {
                    department: completable(z.string(), value => {
                        // Department suggestions
                        return ['engineering', 'sales', 'marketing', 'support'].filter(d => d.startsWith(value));
                    }),
                    name: completable(z.string(), (value, context) => {
                        // Name suggestions based on selected department
                        const department = context?.arguments?.['department'];
                        if (department === 'engineering') {
                            return ['Alice', 'Bob', 'Charlie'].filter(n => n.startsWith(value));
                        } else if (department === 'sales') {
                            return ['David', 'Eve', 'Frank'].filter(n => n.startsWith(value));
                        } else if (department === 'marketing') {
                            return ['Grace', 'Henry', 'Iris'].filter(n => n.startsWith(value));
                        }
                        return ['Guest'].filter(n => n.startsWith(value));
                    })
                }
            },
            ({ department, name }) => ({
                messages: [
                    {
                        role: 'assistant',
                        content: {
                            type: 'text',
                            text: `Hello ${name}, welcome to the ${department} team!`
                        }
                    }
                ]
            })
        );
    }
}