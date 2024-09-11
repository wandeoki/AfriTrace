# AfriTrace

## Overview

**AfriTrace** is a supply chain traceability platform built to enhance the global competitiveness of African exports. By leveraging technologies like **The Graph**, **Optimism's OP Stack**, and **web3.js**, AfriTrace ensures **transparency**, **authenticity**, and **efficiency** in tracking high-value African products from their origin to the final consumer. It empowers African producers by integrating blockchain-based product tracking, carbon footprint offsetting, and a marketplace for connecting with global buyers.

## Key Features

### 1. Blockchain-Based Product Tracking
- End-to-end traceability using smart contracts for immutable records.
- Data is recorded at every stage of the supply chain, ensuring transparency and authenticity.

### 2. QR Code Integration for Consumer Transparency
- Consumers can scan QR codes to access real-time product information from source to destination.
- View certifications, production standards, and carbon footprint details.

### 3. Smart Contract-Powered Automated Payments and Escrow
- Automated payments are triggered based on predefined smart contract conditions.
- Escrow services to ensure trust, reduce disputes, and ensure fair payment release.

### 4. Carbon Footprint Tracking and Offsetting
- Track the environmental impact of transporting goods.
- Facilitate carbon offsetting for a sustainable supply chain.

### 5. Marketplace for African Producers
- A digital marketplace connecting African producers with global buyers.
- Transparent pricing, fair compensation, and reduced middlemen via decentralized processes.

### 6. Settlement in native currencies
- Product owners have the option of getting their proceeds in their MPESA/MOMO Wallet to aid financial inclusion

## Technical Implementation

### 1. The Graph Integration
- Build a **custom subgraph** to index supply chain data recorded in smart contracts.
- Provide a **GraphQL API** for efficient querying of data like product journeys, certifications, authenticity, and transaction details.

### 2. Optimism's OP Stack
- Smart contracts deployed on **Optimism**, a Layer 2 Ethereum scaling solution.
- Leverage Optimism's **OP Stack** for fast, cost-effective transactions.

### 3. OP Stack Calculator
- Integration with the **OP Stack Calculator** to estimate transaction costs.
- Optimize supply chain costs by simulating different operational scenarios and providing cost projections.

### 4. web3.js Namespace Plugin
- Utilize the **web3.js Namespace Plugin** for seamless  login with ENS.


## Impact on African Prosperity

AfriTrace has the potential to transform African exports by fostering trust, promoting transparency, and creating a fair marketplace for producers:

- **Increased Trust**: Blockchain transparency builds consumer trust in African products, increasing global demand.
- **Fair Compensation**: Automated payments ensure producers receive fair compensation without intermediaries.
- **Counterfeit Protection**: Immutable blockchain records combat counterfeiting, protecting the value of African products.
- **Market Access**: Small and medium-sized African producers gain access to global markets, fostering economic growth.
- **Sustainability**: The platform encourages ethical and sustainable production practices through carbon tracking and offsetting.

## Scalability and Global Application

Although AfriTrace is focused on African exports, it is highly scalable and can be adapted for emerging markets worldwide. The platform is positioned as a **global solution**, bringing supply chain transparency and efficiency to producers around the world. Built in Africa, AfriTrace is a **solution for the world**.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js v14+**
- **npm or yarn**
- **The Graph CLI**
- **web3.js**
- **Optimism SDK**

### Contract addresses
- https://sepolia-optimism.etherscan.io/address/0xF7ce2394aA4e767022b67f6695fDC4aE41F7F3B6
- https://sepolia-optimism.etherscan.io/address/0xee150424a9936d09b01442c666627657d2780c6e

### Subgraph endpoint
- https://thegraph.com/studio/subgraph/afritrace

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/afritrace.git
    cd afritrace
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Deploy the smart contracts on Optimism:

    ```bash
    npx hardhat run scripts/deploy.js --network optimism
    ```

4. Build and deploy the subgraph:

    ```bash
    graph codegen
    graph deploy --product hosted-service your-subgraph-name
    ```

### Running the Application

Once installed, run the local development server:

```bash
npm run dev
```

## Roadmap

1. Deploying to optimism mainnet 15-10-2024


