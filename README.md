# Chain-Link Server 🔗

A robust **NestJS-based blockchain middleware** designed to interact with the **UniversalRegistry** smart contract across multiple EVM chains, including **Polygon Amoy** and **Ethereum Sepolia**.

## 🚀 Features

- **🌐 Multi-Chain Support**: Seamlessly interact with smart contracts on Polygon Amoy and Ethereum Sepolia.
- **📝 Registry Management**: Simple RESTful API to **write**, **read**, and **verify** records on-chain.
- **🔐 Secure Signing**: Integrated server-side wallet management for secure transaction signing.
- **📚 Swagger Documentation**: Fully automated, interactive API documentation available at `/api`.
- **🛡 Type-Safe & Modular**: Built with TypeScript and NestJS, ensuing scalability and maintainability.

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- An EVM Wallet Private Key with testnet funds (for Amoy or Sepolia).

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thisha-me/chain-link-server.git
   cd chain-link-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. **Create the environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure Environment Variables**
   Open `.env` and populate it with your values:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `PRIVATE_KEY` | Your wallet private key (required for writing) | `0x123abc...` |
   | `POLYGON_AMOY_RPC` | RPC endpoint for Polygon Amoy | `https://rpc-amoy.polygon.technology` |
   | `POLYGON_AMOY_REGISTRY_ADDRESS` | Contract Address on Amoy | `0xc1a3...` |
   | `SEPOLIA_RPC` | RPC endpoint for Sepolia | `https://rpc.sepolia.org` |
   | `SEPOLIA_REGISTRY_ADDRESS` | Contract Address on Sepolia | `0xa700...` |
   | `PORT` | API Server Port | `3000` |

## 🏃‍♂️ Running the Application

```bash
# development
npm run start

# watch mode (recommended for dev)
npm run start:dev

# production mode
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the **Swagger UI** to inspect and test endpoints:

👉 **[http://localhost:3000/api](http://localhost:3000/api)**

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/registry` | Write a new key-value pair to the registry. |
| `GET` | `/registry/:key` | Retrieve the value for a specific key. Query param `?chain=AMOY` or `SEPOLIA`. |
| `GET` | `/registry/exists/:key` | Check if a key exists on the specified chain. |

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📂 Project Structure

```bash
src/
├── blockchain/       # Blockchain integration (Ethers.js provider/signer)
├── common/           # Shared enums, interfaces, and utilities
├── config/           # Configuration service (Environment validation)
├── registry/         # Core business logic (Controller, Service, DTOs)
└── main.ts           # Application entry point
```

## 📄 License

This project is [MIT licensed](LICENSE).
