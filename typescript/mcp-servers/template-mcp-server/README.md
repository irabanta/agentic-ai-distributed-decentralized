# MCP Server Template

This is an enterprise-grade Model Context Protocol (MCP) server template implementation in TypeScript, designed for deployment in Kubernetes environments with service mesh integration.

## Prerequisites

- Node.js >= 18.x
- npm >= 18.x
- TypeScript >= 5.x

## Installation

```bash
# Clone the repository
git clone https://github.com/irabanta/distributed-decentralized-agentic-ai-mcp.git

# Navigate to the server template directory
cd typescript/mcp-servers/server-template-mcp

# Install dependencies
npm install
```

## Environment Variables

The server uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

### Required Environment Variables

```env
SERVICE_NAME=your-mcp-service-name     # Name of your MCP service
SERVICE_VERSION=1.0.0                  # Version of your service
NODE_ENV=development                   # Environment (development/staging/production)
```
## Development

```bash
# Start the server in development mode
npm run dev

# Build the project
npm run build

# Run tests
npm test

# Start in production mode
npm start
```

## Explanation of the Template MCP Server Example

This template demonstrates the key components of an MCP server through a banking example. Here's how the components work together:

### Component Relationships

1. **Prompts (`src/prompts/AccountBalanceInquiryPrompt.ts`)**
   - Entry point for AI interactions
   - Defines and validates required parameters (`customer_id`, `account_number`)
   - Structures the conversation context for AI processing
   - Uses Zod schema for input validation

2. **Resources (`src/resources/BankPaymentGuideResource.ts`)**
   - Provides static, read-only reference information
   - Acts as documentation that AI can consult
   - Contains non-sensitive, publicly accessible information
   - Helps AI understand context and capabilities

3. **Tools (`src/tools/GetAccountBalanceTool.ts`)**
   - Implements actual business logic
   - Connects to backend services
   - Validates inputs/outputs with schemas
   - Returns structured data and formatted responses

### Flow of Operations

1. User Request Flow:
   - User triggers `bank_balance_inquiry_prompt`
   - Prompt validates required parameters
   - Formats request for AI processing

2. AI Processing:
   - AI can reference `bank_payment_guide_resource`
   - Uses resource information for context
   - Makes informed decisions about operations

3. Action Execution:
   - AI calls `get_account_balance` tool
   - Tool executes balance check via `BankAccountService`
   - Returns formatted results to user

### Benefits of This Architecture

- Clear separation of concerns
- Enhanced security through isolated operations
- Reusable components across AI interactions
- Structured validation at each step
- Clean interface for AI interaction