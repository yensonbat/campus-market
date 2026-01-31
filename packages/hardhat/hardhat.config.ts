import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { task } from "hardhat/config";
import generateTsAbis from "./scripts/generateTsAbis";

// Prioriza la clave privada de tu .env para el despliegue
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Prioriza tu API Key de Etherscan del .env
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

// Prioriza tu URL de QuickNode para Sepolia
const quicknodeRpcUrl = process.env.QUICKNODE_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.30",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      // Configuramos que la cuenta 'deployer' sea la primera definida en el array de accounts de la red
      default: 0,
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: quicknodeRpcUrl,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    // Configuración específica para Sepolia usando QuickNode
    sepolia: {
      url: quicknodeRpcUrl,
      accounts: [deployerPrivateKey],
    },
    mainnet: {
      url: "https://mainnet.rpc.buidlguidl.com",
      accounts: [deployerPrivateKey],
    },
  },
  // Configuración para la verificación del contrato en Etherscan
  etherscan: {
    apiKey: `${etherscanApiKey}`,
  },
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
  sourcify: {
    enabled: false,
  },
};

// Extiende la tarea de despliegue para generar los ABIs necesarios para el frontend
task("deploy").setAction(async (args, hre, runSuper) => {
  await runSuper(args);
  await generateTsAbis(hre);
});

export default config;
