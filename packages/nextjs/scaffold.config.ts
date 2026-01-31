import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export const DEFAULT_ALCHEMY_API_KEY = "cR4WnXePioePZ5fFrnSiR";

const scaffoldConfig = {
  // CAMBIO: Se cambia hardhat por sepolia como red principal
  targetNetworks: [chains.sepolia],

  // Intervalo de sondeo para nuevos datos (ajustado para redes de prueba)
  pollingInterval: 3000,

  // Clave de Alchemy (Vercel usará la variable de entorno si la configuraste)
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // Configuración de RPC personalizada
  rpcOverrides: {
    // Si configuraste NEXT_PUBLIC_QUICKNODE_RPC_URL en Vercel, se usará aquí
    [chains.sepolia.id]:
      process.env.NEXT_PUBLIC_QUICKNODE_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/cR4WnXePioePZ5fFrnSiR",
  },

  // ID de Proyecto para WalletConnect
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // CAMBIO: Se pone en 'false' para que en producción los usuarios usen su propia wallet (MetaMask/Rabby)
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
