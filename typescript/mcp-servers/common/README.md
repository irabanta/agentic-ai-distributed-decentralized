# @daaif/mcp-common

Common utilities and extensions for DAAIF MCP Servers.

## Installation

This package is part of the DAAIF MCP Servers monorepo and is consumed as a workspace dependency.

Add to your MCP server's `package.json`:
```json
{
  "dependencies": {
    "@daaif/mcp-common": "file:../common"
  }
}
```

## Usage

### Zod Extensions

Custom extension methods for Zod string validation:

```typescript
// Import at the top of your entry file (e.g., Server.ts)
import './extensions/ZodExtensions.js';
import { z } from 'zod';

// Now you can use the extension methods
const schema = z.object({
    customer_id: z.string().xRequired("customer_id").xUserMustInput().xLength(6),
    account_number: z.string().xRequired("account_number").xUserMustInput().xLength(10)
});
```

**Available Methods:**
- `xRequired(fieldName?, message?)` - Marks field as required with min length 1
- `xUserMustInput(fieldName?, message?)` - Adds description for AI agents to request user input
- `xLength(length, fieldName?, message?)` - Sets exact string length requirement

**Note for tsx users:** Import the extensions file directly from your local extensions folder:
```typescript
import './extensions/ZodExtensions.js';
```

## Exports

- `@daaif/mcp-common/extensions/zod` - Zod extension methods (for production builds)
- Local copy recommended for development with `tsx`

## Development

```bash
# Build the package
npm run build

# Clean build artifacts
npm run clean
```

## Known Issues

When using `tsx` with `file:` dependencies, prototype extensions may not load correctly. The recommended approach is to copy the extensions file to your project's `src/extensions/` folder and import it directly.
