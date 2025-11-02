import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class MyCustomTool {
    static register(server: McpServer): void {
        // Add an addition tool
        server.registerTool(
            'add',
            {
                title: 'Addition Tool',
                description: 'Add two numbers',
                inputSchema: { a: z.number(), b: z.number() },
                outputSchema: { result: z.number() }
            },
            async ({ a, b }) => {
                const output = { result: a + b };
                return {
                    content: [{ type: 'text', text: JSON.stringify(output) }],
                    structuredContent: output
                };
            }
        );
    }
}