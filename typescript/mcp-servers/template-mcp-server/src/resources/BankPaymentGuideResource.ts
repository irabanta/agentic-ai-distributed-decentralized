import { McpServer, ResourceMetadata, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

// A resource exposes non-sensitive, read-only data or metadata to the model.
// Resources can be used by AI agents to look up information.
// Does not execute actions or modify data. Does not query sensitive or private information.
export class BankPaymentGuideResource {
    static register(server: McpServer): void {
        server.registerResource(
            'bank_payment_guide_resource',
            'https://example.com/resources/bank_payment_guide_resource',
            {
                title: 'XYZ Bank Payment Guide',
                description: 'A comprehensive guide to making payments through XYZ Bank.'
            } as ResourceMetadata,
            async(uri, {}) => ({
                contents: [
                    {
                        uri: uri.href,
                        text: `This is the payment guide for XYZ Bank.`
                    }
                ]
            })
        );
    }
}