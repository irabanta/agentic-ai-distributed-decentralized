# Decentralized Agentic AI Framework (DAAIF)

> :rocket: **Project Status**: Early Development
> 
> :package: **Implementation Status**:
> - [x] Architecture Design
> - [ ] TypeScript Implementation (planned: `typescript` branch) - In Progress
> - [ ] Python Implementation (`main` branch)
> - [ ] .NET Implementation (planned: `dotnet` branch)
> - [ ] Go (planned: `Go` branch)
> - [ ] Java (planned: `Java` branch)
> - [ ] Distributed Decentralized System Architecture
> 
> :handshake: **Contributors Welcome!** Check out our [good first issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") for each implementation.

This project implements a distributed, decentralized agentic AI system framework which is further designed for the end-to-end loan application and approval process in Fintech. It leverages standard protocols such as **A2A (Agent-to-Agent)**, **MCP (Model Context Protocol)**, and **AP2 (Agent Payment Protocol)** to ensure interoperability, security, and scalability across multiple technology stacks.

## Key Features
- **Distributed & Decentralized**: Agents operate across multiple nodes, ensuring resilience and no single point of failure.
- **Agentic AI**: Each agent can reason, communicate, and act autonomously within the loan process.
- **Protocol-Driven**: Adheres to A2A, MCP, and AP2 standards for secure, interoperable agent communication.
- **Fintech Use Case**: Focused on automating and optimizing the loan application, evaluation, and approval workflow.
- **Open for Contributions**: Designed as a collaborative project for engineering students and the open-source community.

## Business Architecture

The Distributed Decentralized Agentic AI framework (DAAIF) provides a foundational architecture for building scalable, autonomous AI systems where multiple specialized agents collaborate through standardized protocols (MCP, A2A, AP2). This framework is designed to be industry-agnostic, offering core capabilities such as agent-to-agent communication, secure OAuth-based authentication, distributed state management, and modular deployment options across different cloud providers. Organizations can leverage this framework to build their own distributed AI solutions by implementing domain-specific agents that inherit the framework's robust infrastructure for communication, security, and scalability, while adding their unique business logic and integrations.

As a reference implementation, the framework showcases its capabilities through a comprehensive loan processing system, demonstrating how financial institutions can leverage DAAIF's architecture. This implementation includes specialized agents for loan application processing, credit scoring, document verification, and automated decisioning, all working together as autonomous units while maintaining regulatory compliance and data security. While the loan processing implementation serves as a practical example, the framework's core components – from the Controller Agent's routing capabilities to the standardized MCP server/client interactions – are designed to be repurposed for various industries, whether it's supply chain management, healthcare operations, or retail automation. This dual approach of providing both a generic framework and a specific implementation allows organizations to understand the practical application while having the flexibility to adapt the architecture for their unique business needs.

## Use Case Overview
- **Loan Application Submission**
- **Credit Scoring & Risk Assessment**
- **Document Verification**
- **Approval/Denial Decisioning**
- **Payment Processing & Disbursement** (AP2-enabled)
- **Automated Repayment Scheduling** (AP2-enabled)
- **Notifications & Audit Trail**
- **Detect Anomalies**

## Distributed Decentralized Agent Architecture

Each use case above is implemented as an autonomous Agent following an A2A (Agent-to-Agent) architecture: every Agent acts as both a server and a client. On top of the use-case agents there is a single Controller Agent that routes requests from external clients to the appropriate use-case Agents. The Controller Agent also exposes an MCP server endpoint to serve external MCP clients (for example: Claude or other external LLM-driven clients).

Key architecture rules:
- Each Use Case -> one Agent (A2A): e.g., LoanSubmissionAgent, CreditScoringAgent, DocumentVerificationAgent, DecisioningAgent, NotificationAgent.
- Every Agent runs:
	- an A2A endpoint (server) to receive requests from other agents or the Controller Agent.
	- an MCP Client to call one or more MCP Servers.
- The Controller Agent also exposes an MCP to allow external MCP Clients connect it.
- MCP Clients and MCP Servers use OAuth for authentication; different connections may use different OAuth providers (one OAuth provider per agent-to-agent connection or per role) to support separation of trust and multi-tenant deployments.

System Architecture:

```
┌──────────────────────────── External Clients ─────────────────────────────┐
│                                                                          │
│    ┌───────────────┐                          ┌───────────────┐         │
│    │Claude/GPT     │                          │Web/Mobile Apps│         │
│    └───────┬───────┘                          └───────┬───────┘         │
└────────────┼──────────────────────────────────────────┼────────────────-┘
             │                                           │
             └───────────────────┐     ┌────────────────┘
                                ▼     ▼ MCP/OAuth
┌───────────────────── Controller Agent Layer ──────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │     MCP Server + MCP Client + Service Discovery              │    │
│  └────────────────────────────┬─────────────────────────────────┘    │
└───────────────────────────────┼──────────────────────────────────────┘
                                │
        ┌──────────────────┬────┴─────┬──────────────┬─────────┐
        │                  │          │              │         │
        ▼ A2A/OAuth       ▼          ▼              ▼         ▼
┌──────────────┐  ┌──────────────┐  ┌─────────┐  ┌─────────┐ ┌─────────┐
│ Loan Agent   │  │ Credit Agent │  │Doc Agent│  │Decision │ │Notify   │
│[A2A+MCP]    │◄-►│[A2A+MCP]    │◄►│[A2A+MCP]│◄►│Agent    │►│Agent    │
└──────┬───────┘  └───────┬──────┘  └────┬────┘  └────┬────┘ └────┬────┘
       │                  │               │            │           │
       │                  │               │            │           ▼
       │                  │               │            │    ┌──────────────┐
       │                  │               │            │    │Queue MCP     │
       │                  │               │            │    │Server        │
       │                  │               │            │    │[MessageQueue]│
       │                  │               │            │    └──────────────┘
       │                  │               │            ▼
       │                  │               │     ┌──────────────┐
       │                  │               │     │Rules Engine  │
       │                  │               │     │MCP Server    │
       │                  │               │     │[Rules DB]    │
       │                  │               │     └──────────────┘
       │                  │               ▼
       │                  │        ┌──────────────┐
       │                  │        │Document Store│
       │                  │        │MCP Server    │
       │                  │        │[Doc DB]      │
       │                  │        └──────────────┘
       │                  ▼
       │           ┌──────────────┐
       │           │Credit Score  │
       │           │MCP Server    │
       │           │[Credit DB]   │
       └──────────►└──────────────┘
       │
       │           ┌──────────────┐
       └──────────►│Loan Process  │    Note: Loan Agent connects to
                  │MCP Server    │    multiple specialized servers:
                  │[Loan DB]     │    - Credit Score MCP
                  └──────┬───────┘    - Loan Process MCP
                        │            - AP2 Payment Server
                        ▼
                  ┌──────────────┐
                  │AP2 Payment   │
                  │Server        │
                  │[PaymentQueue]│
                  └──────────────┘
```

Each box represents an autonomous agent with both A2A Server and MCP Client capabilities. The Controller Agent acts as the main MCP Server for external clients while routing requests to specialized agents. All connections between components use OAuth with separate providers for security isolation. Each agent maintains its own storage system (database or queue) for persistence.

Controller Agent (MCP Server + MCP Client)
	|
	|--(OAuth Provider A)--> LoanSubmissionAgent (A2A Server + MCP Client)
	|--(OAuth Provider B)--> CreditScoringAgent (A2A Server + MCP Client)
	|--(OAuth Provider C)--> DocumentVerificationAgent (A2A Server + MCP Client)
	|--(OAuth Provider D)--> DecisioningAgent (A2A Server + MCP Client)
	|--(OAuth Provider E)--> NotificationAgent (A2A Server + MCP Client)

Notes:
- Use a distinct OAuth provider or distinct client credentials per logical connection when you need separated trust domains (for instance, Provider A for loan submission traffic, Provider B for credit scoring, etc.).
- Each agent's MCP Client may be configured with one or more MCP Server endpoints (for redundancy and multi-region deployment).
- The Controller Agent provides a single well-known MCP Server endpoint for external MCP clients; internal routing and discovery can be performed using service registry or secure discovery channels.

## Approach of Development
Development approach will be bottom-up. This means we will be starting by developing MCP Servers like Loan Process, Credit Score, Document Store, Rules Engine, Queue MCP. After that, we will build the Agents and Controller Agent.

The project leverages open-source SDKs for each technology stack that fully implements the MCP specifications. These SDKs provide ready-to-use components for quickly creating new MCP servers that expose resources, prompts, and tools, as well as MCP clients capable of connecting to any MCP server with OAuth integration. The SDKs support standard transports including stdio and streamable HTTP, ensuring consistent communication patterns across different implementations. This approach significantly reduces development time while maintaining protocol compliance and interoperability across the distributed system.

## Technologies, Standards & SDKs
- **Typescript**: ([MCP](https://github.com/modelcontextprotocol/typescript-sdk)), ([A2A](https://github.com/a2aproject/a2a-java))
- **.NET, C#**: ([MCP](https://github.com/modelcontextprotocol/csharp-sdk)), ([A2A](https://github.com/a2aproject/a2a-dotnet))
- **Python**: ([MCP](https://github.com/modelcontextprotocol/python-sdk)), ([A2A](https://github.com/a2aproject/a2a-python))
- **Go**: ([MCP](https://github.com/modelcontextprotocol/go-sdk)), ([A2A](https://github.com/a2aproject/a2a-go))
- **Java**: ([MCP](https://github.com/modelcontextprotocol/java-sdk)), ([A2A](https://github.com/a2aproject/a2a-java))

## Protocols
- **MCP: Model-Context-Protocol**: ([Specifications](https://modelcontextprotocol.io/specification/2025-06-18))
- **A2A: Agent-to-Agent**: ([docs](https://a2a-protocol.org/latest/specification/))
- **AP2: Agent Payments Protocol**: ([docs](https://github.com/google-agentic-commerce/AP2)) - Google's secure protocol for automated financial transactions
  - Secure payment processing and disbursement
  - Automated repayment scheduling
  - Multi-currency support
  - Regulatory compliance handling
  - Audit trail generation
- **JSON-RPC 2.0**
- **gRPC**
- **HTTP+JSON/REST Transport**: Production must use TLS 1.3+

## Development Tools
- **Visual Studio Code Insiders**: IDE Supports MCP development and testing (https://code.visualstudio.com/insiders/)
- **MCP Inspector**: ([How to install and run the tool](https://github.com/modelcontextprotocol/inspector))

## MCP Features & Best Practices

This project will provide comprehensive features and practical guides for working with the Model Context Protocol (MCP), including:

- **MCP Lifecycle** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle)): Lifecycle for the client-server connections that ensures proper capability negotiation and state management.
- **MCP Transports** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)): Standard transport mechanisms for client-server communication.
- **MCP Prompts** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)): provides a standardized way for servers to expose prompt templates to clients.
- **MCP Resources** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)): provides a standardized way for servers to expose resources to clients.
- **MCP Tools** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)): allows servers to expose tools that can be invoked by language models.
- **MCP Elicitation** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)): Techniques for eliciting context and requirements from agents and clients.
- **MCP Sampling** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling)): Methods for sampling and managing context data within MCP workflows.
- **MCP Authentication** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)): Implementing robust authentication with oAuth.
- **MCP Authorization** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)): Implementing robust authorization mechanisms for secure access.
- **MCP Security Considerations** ([docs](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)): Best practices for securing MCP servers and communications.
- **Deploying MCP Servers with oAuth**: Step-by-step deployment with modern authentication.
- **Configuring/Connecting MCP Servers with AI Agents and Agentic AI**: Integrating MCP with distributed agentic systems.
- **Testing of Remote MCP Servers**: Strategies and tools for validating remote MCP server functionality.

This section will be regularly updated with code samples, configuration tips, and troubleshooting advice to help contributors and users effectively leverage MCP in distributed agentic AI systems.

## Multi-Agent (A2A) Features & Best Practices
- **Specifications**: ([docs](https://a2a-protocol.org/latest/specification/))

## Security Considerations
- **Authentication & Authorization (oAuth 2.0)**
- **Risk of Vibe coding**
- **Excesive Permission**
- **Agent Error**
- **Prompt injection**
- **Confused Deputy**
- **Session Hijacking**

## Deployment Environments
- **Localhost**
- **Cloudflare**
- **Azure, API Management**
- **AWS**
- **GCP**

## Distributed Decentralized System Architecture **Next Steps**

### 1. High Availability & Fault Tolerance
- Add Controller Agent redundancy using:
  - Azure: AKS with multi-region deployment
  - AWS: EKS with multi-AZ configuration
  - GCP: GKE with regional clusters
- Implement service mesh using:
  - Azure: Service Fabric Mesh
  - AWS: App Mesh
  - GCP: Anthos Service Mesh
- Add circuit breakers:
  - Azure: Application Gateway
  - AWS: API Gateway with Lambda
  - GCP: Cloud Load Balancing

### 2. Monitoring & Observability
- Agent health monitoring using:
  - Azure: Application Insights
  - AWS: CloudWatch
  - GCP: Cloud Monitoring
- Distributed tracing with:
  - Azure: Application Insights with distributed tracing
  - AWS: X-Ray
  - GCP: Cloud Trace
- Metrics collection through:
  - Azure: Azure Monitor
  - AWS: CloudWatch Metrics
  - GCP: Cloud Monitoring Metrics API

### 3. State Management
- Distributed cache implementation:
  - Azure: Azure Cache for Redis
  - AWS: ElastiCache
  - GCP: Memorystore
- State synchronization using:
  - Azure: Cosmos DB with multi-region write
  - AWS: DynamoDB global tables
  - GCP: Cloud Spanner

### 4. Error Handling & Recovery
- Transaction compensation using:
  - Azure: Service Bus with dead-letter queues
  - AWS: SQS with dead-letter queues
  - GCP: Cloud Pub/Sub with dead-letter topics
- Retry policies implementation:
  - Azure: Azure Functions retry policies
  - AWS: Step Functions retry policies
  - GCP: Cloud Tasks with retry config

### 5. Scalability Enhancements
- Load balancing implementation:
  - Azure: Front Door + Traffic Manager
  - AWS: Route 53 + ALB
  - GCP: Cloud Load Balancing
- Agent pooling using:
  - Azure: Container Apps
  - AWS: ECS
  - GCP: Cloud Run

### 6. Security Enhancements
- Rate limiting through:
  - Azure: API Management
  - AWS: API Gateway
  - GCP: Cloud Endpoints
- Authentication/Authorization:
  - Azure: Azure AD B2C
  - AWS: Cognito
  - GCP: Identity Platform
- API Security:
  - Azure: Key Vault + Azure Private Link
  - AWS: Secrets Manager + PrivateLink
  - GCP: Secret Manager + VPC Service Controls

### 7. Data Consistency
- Event sourcing implementation:
  - Azure: Event Hubs
  - AWS: Kinesis
  - GCP: Pub/Sub
- Versioning and conflict resolution:
  - Azure: Cosmos DB with conflict resolution
  - AWS: DynamoDB Streams
  - GCP: Firestore with transactions

### 8. DevOps & Deployment
- CI/CD implementation:
  - Azure: Azure DevOps + GitHub Actions
  - AWS: CodePipeline + CodeBuild
  - GCP: Cloud Build + Cloud Deploy
- Container registry:
  - Azure: Azure Container Registry
  - AWS: Elastic Container Registry
  - GCP: Artifact Registry
- Infrastructure as Code:
  - Azure: ARM templates + Bicep
  - AWS: CloudFormation + CDK
  - GCP: Deployment Manager + Terraform

## Getting Started
1. **Clone the Repository**
2. **Chose your tech stack from the repository (example: typescript)**
3. **Install Dependencies** (npx ....)
4. **Run Example Agents**

## Contributing
We welcome contributions from engineering students and the open-source community! Please see `CONTRIBUTING.md` (to be added) for guidelines.

## License
This project is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
See the full text in the `LICENSE` file.

## Contact
For questions or collaboration, open an issue or submit a pull request.

You can reach out him using any of these handle:

([Github @irabanta](https://github.com/irabanta))

([Linkedin @Chingangbam Irabanta](https://www.linkedin.com/in/chingangbam-irabanta-2918095/))

([Facebook @irabantas](https://www.facebook.com/irabantas))

Email: irabanta@gmail.com