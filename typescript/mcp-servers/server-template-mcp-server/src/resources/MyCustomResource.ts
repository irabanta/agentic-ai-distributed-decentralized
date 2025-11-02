import { McpServer, ReadResourceCallback, ResourceMetadata, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

export class MyCustomResource {
    static register(server: McpServer): void {
        server.registerResource(
            'My Github Repository Uri Generator',
            new ResourceTemplate('https://github.com/{username}/{repositoryname}', {list: undefined}),
            {
                title: 'My Github Repository Uri Generator',
                description: 'My Github resources for public contribution'
            } as ResourceMetadata,
            async(uri, {username, repositoryname}) => ({
                contents: [
                    {
                        uri: uri.href,
                        text: `Github repository for user ${username} and repository ${repositoryname}`
                    }
                ]
            })
        );
    }
}