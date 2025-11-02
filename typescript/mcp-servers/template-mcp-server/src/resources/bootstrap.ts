import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MyCustomResource } from './MyCustomResource.js';

/** Manage all tools */
export class ResourcesBootstrap {
    static instance: ResourcesBootstrap;

    /**Bootstrap to register all resources */
    public static async bootstrap(server: McpServer): Promise<void> {
        this.instance = new ResourcesBootstrap();
        return this.instance.registerResources(server);
    }
    protected async registerResources(_server: McpServer): Promise<void> {
        // Register resource implementations here
        return new Promise((resolve) => {
            MyCustomResource.register(_server);
            //TODO: Add more prompts here

            resolve();
        });
    }
}