# Distributed Decentralized Agentic AI for Fintech Loan Applications

> :rocket: **Project Status**: Early Development
> 
> :package: **Implementation Status**:
> - [x] Architecture Design
> - [ ] Python Implementation (`main` branch)
> - [ ] TypeScript Implementation (planned: `typescript` branch)
> - [ ] .NET Implementation (planned: `dotnet` branch)
> 
> :handshake: **Contributors Welcome!** Check out our [good first issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") for each implementation.

This project implements a distributed, decentralized agentic AI system designed for the end-to-end loan application and approval process in Fintech. It leverages standard protocols such as **A2A (Agent-to-Agent)**, **MCP (Model Context Protocol)**, and **AP2 (Agent Protocol 2)** to ensure interoperability, security, and scalability across multiple technology stacks.

## Key Features
- **Distributed & Decentralized**: Agents operate across multiple nodes, ensuring resilience and no single point of failure.
- **Agentic AI**: Each agent can reason, communicate, and act autonomously within the loan process.
- **Protocol-Driven**: Adheres to A2A, MCP, and AP2 standards for secure, interoperable agent communication.
- **Fintech Use Case**: Focused on automating and optimizing the loan application, evaluation, and approval workflow.
- **Open for Contributions**: Designed as a collaborative project for engineering students and the open-source community.

## Use Case Overview
- **Loan Application Submission**
- **Credit Scoring & Risk Assessment**
- **Document Verification**
- **Approval/Denial Decisioning**
- **Notifications & Audit Trail**
- **Notifications & Audit Trail**

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
       └──────────►│Loan Process  │    Note: Loan Agent connects to both
                  │MCP Server    │    Credit Score and Loan Process MCP
                  │[Loan DB]     │    servers as an example of multi-server
                  └──────────────┘    connectivity
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

## Technologies & Standards
- **Python 3.x**
- **A2A, MCP, AP2 Protocols**
- **Distributed Systems & Messaging**
- **Security & Privacy Best Practices**

## Development Tools
- **Visual Studio Code Insiders**: IDE Supports MCP development and testing (https://code.visualstudio.com/insiders/)

## MCP Features & Best Practices

This project will provide comprehensive features and practical guides for working with the Model Context Protocol (MCP) in Python, including:

- **Python MCP SDK**: How to build and extend an MCP server using the official SDK.
- **MCP Elicitation**: Techniques for eliciting context and requirements from agents and clients.
- **MCP Sampling**: Methods for sampling and managing context data within MCP workflows.
- **MCP Authentication**: Implementing robust authentication with oAuth.
- **MCP Authorization**: Implementing robust authorization mechanisms for secure access.
- **MCP Security Considerations**: Best practices for securing MCP servers and communications.
- **Deploying MCP Servers with oAuth**: Step-by-step deployment with modern authentication.
- **Configuring/Connecting MCP Servers with AI Agents and Agentic AI**: Integrating MCP with distributed agentic systems.
- **Testing of Remote MCP Servers**: Strategies and tools for validating remote MCP server functionality.

This section will be regularly updated with code samples, configuration tips, and troubleshooting advice to help contributors and users effectively leverage MCP in distributed agentic AI systems.

## Getting Started
1. **Clone the Repository**
2. **Set up Python Environment**
3. **Install Dependencies** (requirements.txt to be provided)
4. **Run Example Agents**

## Contributing
We welcome contributions from engineering students and the open-source community! Please see `CONTRIBUTING.md` (to be added) for guidelines.

## License
This project is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
See the full text in the `LICENSE` file.

## Contact
For questions or collaboration, open an issue or submit a pull request.
Or contact [@irabanta](https://github.com/irabanta)
