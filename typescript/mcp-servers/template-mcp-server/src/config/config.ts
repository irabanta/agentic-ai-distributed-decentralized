import pkg from '../../package.json' with { type: "json" };
import { env } from 'process';
import { ServerConfig } from '../types/ServerConfig.js';

export const getServerConfig = (): ServerConfig => {
    return {
        // Use environment variables with fallbacks to package.json
        name: env.SERVICE_NAME || pkg.name,
        version: env.SERVICE_VERSION || pkg.version,
        environment: env.NODE_ENV || 'development',
        metadata: {
            kubernetes: {
                namespace: env.K8S_NAMESPACE,
                podName: env.K8S_POD_NAME,
                nodeName: env.K8S_NODE_NAME
            },
            git: {
                commitSha: env.GIT_COMMIT_SHA,
                branch: env.GIT_BRANCH
            }
        }
    };
};