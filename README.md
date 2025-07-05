# jest-webdriverio-standalone-boilerplate

> Modern WebdriverIO Jest boilerplate with Wiremock, TypeScript, and ESLint

## Features

- ✅ **WebdriverIO 9** - Latest WebDriver automation framework
- ✅ **Jest 29** - Modern JavaScript testing framework  
- ✅ **TypeScript 5** - Full TypeScript support with strict mode
- ✅ **expect-webdriverio 5** - WebdriverIO-specific Jest matchers
- ✅ **ESLint** - Code linting with TypeScript, Jest, and WebdriverIO rules
- ✅ **Wiremock 7** - HTTP service virtualization for testing
- ✅ **ES Modules** - Modern module system support

## Prerequisites

- **Node.js** 18+ 
- **Java** (for Wiremock service)

## Quick Start

1. **Install dependencies**
   ```bash
   npm ci
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Lint code**
   ```bash
   npm run lint
   ```

4. **Validate everything**
   ```bash
   npm run validate
   ```

## Available Scripts

- `npm test` - Run all tests with Jest
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run lint:check` - Lint with zero warnings tolerance
- `npm run validate` - Run linting + tests

## Project Structure

```
├── __tests__/           # Test files
│   ├── test1.spec.ts    # WebdriverIO comprehensive tests
│   └── wiremock-service.spec.ts
├── __stubs__/           # Wiremock stubs/mappings
├── eslint.config.mjs    # ESLint configuration
├── jest.config.mjs      # Jest configuration  
├── global.d.ts          # Global TypeScript declarations
└── wdio.conf.ts         # WebdriverIO configuration
```

## Package Details

**Project Type**: ES Modules (`"type": "module"`)

**Key Dependencies:**
- **webdriverio**: `^9.16.2` - WebDriver automation
- **jest**: `^29.7.0` - Testing framework
- **expect-webdriverio**: `5.3.5` (yalc-linked) - WebdriverIO Jest matchers
- **typescript**: `^5.8.3` - TypeScript compiler
- **wdio-wiremock-service**: `^7.0.2` - Wiremock integration

**Development Tools:**
- **eslint**: `^9.30.1` with TypeScript, Jest, and WebdriverIO plugins
- **@typescript-eslint**: `^8.35.1` - TypeScript ESLint rules
- **eslint-plugin-jest**: `^29.0.1` - Jest-specific linting rules
- **eslint-plugin-wdio**: `^9.16.2` - WebdriverIO-specific linting rules

## Configuration Highlights

- **TypeScript**: Strict mode enabled with ES2022 target
- **ESLint**: Comprehensive rules for TypeScript, Jest, and WebdriverIO
- **Jest**: ES modules support with experimental VM modules
- **WebdriverIO**: Chrome browser automation configured
- **expect-webdriverio**: Custom yalc version for enhanced matchers

## Notes

- This project uses **ES modules** (`"type": "module"`)
- WebdriverIO expect matchers are async and should be awaited
- Wiremock service runs on port 8080 during tests
- ESLint enforces `no-floating-promises` to catch unawaited async calls
