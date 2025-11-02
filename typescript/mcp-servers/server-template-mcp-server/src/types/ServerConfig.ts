export interface ServerConfig {
    name: string;
    version: string;
    environment: string;
    metadata: {
        kubernetes?: {
            namespace?: string;
            podName?: string;
            nodeName?: string;
        };
        git?: {
            commitSha?: string;
            branch?: string;
        };
    };
}